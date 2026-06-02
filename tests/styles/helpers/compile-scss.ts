// Test helper: compile a library SCSS entry point and inspect emitted CSS.
//
// The MDL theming is delivered as SCSS that consumers @use. Several visual
// contracts (input heights, shapes, weights) are encoded as Material density /
// token values in those files. jsdom has no layout engine, so we cannot assert
// rendered pixel heights from a component spec. Instead we compile the real
// SCSS with dart-sass and assert the emitted design tokens — this pins the
// contract at its source.
//
// These tests run under a dedicated node-environment Vitest config
// (vitest.styles.config.ts), separate from the Angular `@angular/build:unit-test`
// runner which is browser-targeted and cannot use node APIs / dart-sass.
import * as sass from 'sass';
import * as path from 'node:path';
import * as fs from 'node:fs';

/** Walk up from a starting dir until we find the repo root (node_modules + projects). */
function findRepoRoot(start: string): string {
  let dir = start;
  for (let i = 0; i < 12; i++) {
    if (
      fs.existsSync(path.join(dir, 'node_modules', '@angular', 'material')) &&
      fs.existsSync(path.join(dir, 'projects', 'mdl-angular'))
    ) {
      return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return process.cwd();
}

const REPO_ROOT = findRepoRoot(process.cwd());

/** Compile a component SCSS file (path relative to projects/mdl-angular/scss/). */
export function compileMdlScss(relFromScss: string): string {
  const abs = path.join(REPO_ROOT, 'projects', 'mdl-angular', 'scss', relFromScss);
  return sass.compile(abs, {
    loadPaths: [REPO_ROOT, path.join(REPO_ROOT, 'node_modules')],
    silenceDeprecations: ['import', 'global-builtin', 'color-functions'],
  }).css;
}

/**
 * Every value assigned to a CSS custom property across the compiled CSS, in
 * source order. e.g. tokenValues(css, '--mat-form-field-container-height')
 * → ['48px', '40px'].
 */
export function tokenValues(css: string, token: string): string[] {
  const re = new RegExp(`${token.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}:\\s*([^;]+);`, 'g');
  const out: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(css))) out.push(m[1].trim());
  return out;
}

/**
 * Body of the first CSS rule whose selector list contains `selector` (with the
 * selector belonging to that rule's header, not a previous body). Returns the
 * text between the matching braces, with nested rules preserved.
 */
export function ruleBody(css: string, selector: string): string {
  let from = 0;
  for (;;) {
    const idx = css.indexOf(selector, from);
    if (idx === -1) return '';
    const open = css.indexOf('{', idx);
    if (open === -1) return '';
    // The selector must be part of this rule's header: no `}` between the
    // selector text and the opening brace (otherwise it sits in a prior body).
    if (!css.slice(idx, open).includes('}')) {
      let depth = 1;
      let k = open + 1;
      for (; k < css.length && depth > 0; k++) {
        if (css[k] === '{') depth++;
        else if (css[k] === '}') depth--;
      }
      return css.slice(open + 1, k - 1);
    }
    from = idx + selector.length;
  }
}
