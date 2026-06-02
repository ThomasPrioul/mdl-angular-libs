// Visual contract: MDL form fields are denser than the Material default.
//
// Material's default container height (density 0) is 56px. MDL ships a compact
// SNCF look: 48px by default, 40px under the `.small` class. This regressed on
// Angular 21 because the density was passed as `map.set(theme, "density", -2)`,
// a form the v21 density mixin silently ignores (falling back to 56px). These
// tests pin the heights at the SCSS source so the regression cannot return
// unnoticed.
import { describe, it, expect } from 'vitest';
import { compileMdlScss, tokenValues, ruleBody } from './helpers/compile-scss';

describe('form-field density (input heights)', () => {
  const css = compileMdlScss('material/components/form-field.scss');

  it('default container height is 48px (not the 56px Material default)', () => {
    const heights = tokenValues(css, '--mat-form-field-container-height');
    expect(heights).toContain('48px');
    expect(heights).not.toContain('56px');
  });

  it('.small container height is 40px', () => {
    const small = ruleBody(css, '.small');
    const heights = tokenValues(small, '--mat-form-field-container-height');
    expect(heights).toContain('40px');
  });
});
