// Visual contract (showcase): the settings-drawer header keeps its dark banner.
//
// The header borrows the toolbar tokens (`--mat-toolbar-container-background-
// color` / `-text-color`). On MD2 those were set at theme level (and resolve to
// the dark value under the header's `.dark` class). MD3 leaves them unset
// (the value is only an inline fallback inside real mat-toolbars), so a plain
// element borrowing them got a transparent/white background. Add a
// `--mat-sys-surface` / `--mat-sys-on-surface` fallback so the banner stays
// dark on MD3 too.
import { describe, it, expect } from 'vitest';
import { compileScss } from './helpers/compile-scss';

describe('fieldset padding vs tailwind preflight', () => {
  const css = compileScss('projects/showcase/src/scss/forms.scss');

  // Tailwind preflight resets `fieldset { padding: 0 }` and is emitted after
  // forms.scss (equal specificity → preflight wins). Scope the padding to
  // `body fieldset` (0,0,2) so it outranks preflight (0,0,1).
  it('scopes fieldset padding so it beats preflight (body fieldset)', () => {
    expect(css).toMatch(/body\s+fieldset[^{]*\{[^}]*padding:\s*0\.6rem/);
  });
});

describe('settings-drawer header banner', () => {
  const css = compileScss('projects/showcase/src/scss/settings-drawer.scss');

  it('falls back to the MD3 surface token for the background', () => {
    expect(css).toMatch(
      /--mat-toolbar-container-background-color,\s*var\(--mat-sys-surface/
    );
  });

  it('falls back to the MD3 on-surface token for the text colour', () => {
    expect(css).toMatch(/--mat-toolbar-container-text-color,\s*var\(--mat-sys-on-surface/);
  });
});
