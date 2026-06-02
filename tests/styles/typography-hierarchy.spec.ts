// Visual contract: the MD3 core emits the SNCF typography hierarchy.
//
// core.scss (MD2) includes `mat.typography-hierarchy(theme.$sncf-typography)`,
// which styles `.mat-h1`–`.mat-h6` / `.mat-headline-*` / `.mat-subtitle-*` etc.
// core-md3.scss only emitted the `--mat-sys-*` typography tokens and forgot the
// hierarchy, so headings that use those classes (datepicker "Choix rapide" =
// `.mat-h3`, drawer/fieldset titles, snackbar text) lost their size and weight
// on Angular 21. We add the same SNCF hierarchy so MD3 matches MD2.
import { describe, it, expect } from 'vitest';
import { compileMdlScss } from './helpers/compile-scss';

describe('MD3 core typography hierarchy', () => {
  const css = compileMdlScss('material/core-md3.scss');

  it('emits the .mat-h3 hierarchy class', () => {
    expect(css).toMatch(/\.mat-h3\b/);
  });

  it('styles .mat-h3 with the SNCF 16px / 500 scale', () => {
    expect(css).toContain('font: 500 16px');
  });

  it('emits the full heading range (.mat-h1 … .mat-h6)', () => {
    expect(css).toMatch(/\.mat-h1\b/);
    expect(css).toMatch(/\.mat-h6\b/);
  });
});
