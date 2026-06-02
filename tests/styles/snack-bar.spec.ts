// Visual contract: MDL snackbars keep their 8px shape, bold text and themed
// background on Angular 21 (MD3).
//
// MD3 renamed the snackbar tokens from `--mdc-snackbar-*` to
// `--mat-snack-bar-*` and now paints the `.mdc-snackbar__surface` itself.
// snack-bar.scss only set the old names, so on Angular 21 snackbars fell back
// to the 4px shape / 400 weight / default dark surface, and the custom
// container background/radius no longer reached the surface (success lost its
// primary blue; info/error showed a white corner where the 8px container met
// the 4px surface). We now set both token families and let the surface tokens
// drive shape + colour, so there is no container/surface mismatch.
import { describe, it, expect } from 'vitest';
import { compileMdlScss, tokenValues, ruleBody } from './helpers/compile-scss';

describe('snack-bar tokens (shape / weight / themed background)', () => {
  const css = compileMdlScss('material/components/snack-bar.scss');

  it('sets the MD3 container shape to 8px', () => {
    expect(tokenValues(css, '--mat-snack-bar-container-shape')).toContain('8px');
  });

  it('keeps bold (500) supporting text on MD3', () => {
    expect(tokenValues(css, '--mat-snack-bar-supporting-text-weight')).toContain('500');
  });

  it('themes the info/success snackbar background via the MD3 token', () => {
    const info = ruleBody(css, '.mdl.info');
    expect(info).toMatch(/--mat-snack-bar-container-color/);
  });

  it('retains the legacy --mdc-snackbar-* tokens for Angular 19 consumers', () => {
    expect(tokenValues(css, '--mdc-snackbar-container-shape')).toContain('8px');
  });

  // The duration progress animation must overlay the gradient WITHOUT wiping the
  // surface's base background-color (which comes from --mat-snack-bar-container-
  // color). Using the `background` shorthand reset it to transparent, so the
  // darker progress played over a white/transparent surface.
  it('paints the progress gradient via background-image (keeps the base fill)', () => {
    expect(css).toMatch(/background-image:\s*linear-gradient/);
    expect(css).toMatch(/background-repeat:\s*no-repeat/);
  });

  it('does not reset the surface background with a `background:` gradient shorthand', () => {
    expect(css).not.toMatch(/background:\s*linear-gradient/);
  });
});
