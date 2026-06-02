// Visual contract: the MD3 core emits Material's elevation classes.
//
// core.scss (MD2) includes `mat.elevation-classes()`, which emits
// `.mat-elevation-z0` … `.mat-elevation-z24` (box-shadows). core-md3.scss
// omitted it, so `<… class="mat-elevation-z8">` (e.g. the table2 example) lost
// its shadow on Angular 21. Mirror core.scss.
import { describe, it, expect } from 'vitest';
import { compileMdlScss } from './helpers/compile-scss';

describe('MD3 core elevation classes', () => {
  const css = compileMdlScss('material/core-md3.scss');

  it('emits .mat-elevation-z8 with a box-shadow', () => {
    expect(css).toMatch(/\.mat-elevation-z8\b/);
    expect(css).toMatch(/\.mat-elevation-z8[^{]*\{[^}]*box-shadow/);
  });
});
