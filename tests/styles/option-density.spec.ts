// Visual contract: select/autocomplete option rows have a stable height.
//
// Material hardcodes a 48px option min-height, but the perceived row height
// drifted between Material versions (label line-height moved from 22px to
// 1.25rem) which made MD3 option lists look more cramped than the published
// v1. We pin the default option height (48px) and the `.small` height (40px)
// at the SCSS source so the look is deterministic regardless of Material
// default drift.
import { describe, it, expect } from 'vitest';
import { compileMdlScss, tokenValues, ruleBody } from './helpers/compile-scss';

describe('option density (row heights)', () => {
  const css = compileMdlScss('material/components/option.scss');

  it('default .mat-mdc-option pins min-height to 48px', () => {
    // A bare `.mat-mdc-option { ... min-height: 48px }` rule (not the `.small`
    // override). Sass may split the declarations across several blocks, so we
    // match the rule directly rather than via ruleBody.
    expect(css).toMatch(/\.mat-mdc-option\s*\{[^}]*min-height:\s*48px/);
  });

  it('.small option is 40px', () => {
    const small = ruleBody(css, '.small');
    expect(small).toMatch(/min-height:\s*40px/);
  });

  it('default option label line-height is 22px (not the cramped 1.25rem)', () => {
    expect(tokenValues(css, '--mat-option-label-text-line-height')).toContain('22px');
  });

  // `.small` compacts the trigger field, not the dropdown. Select/autocomplete
  // option rows must stay 48px even when the panel inherits `.small` (e.g. from
  // a small filter field or a consumer's small select). This rule outranks the
  // generic `.small .mat-mdc-option` (40px) override via higher specificity.
  it('forces 48px on select-panel options regardless of .small', () => {
    expect(css).toMatch(
      /\.cdk-overlay-pane\s+\.mat-mdc-select-panel\s+\.mat-mdc-option[^{]*\{[^}]*min-height:\s*48px\s*!important/
    );
  });

  it('forces 48px on autocomplete-panel options regardless of .small', () => {
    expect(css).toMatch(/\.mat-mdc-autocomplete-panel\s+\.mat-mdc-option[^{]*\{[^}]*min-height:\s*48px\s*!important/);
  });
});
