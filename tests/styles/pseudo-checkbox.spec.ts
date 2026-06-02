// Visual contract: multi-select option ticks use the SNCF primary, like the
// standalone checkboxes ("check all").
//
// MD3 themes the option pseudo-checkbox from the azure palette (#005cbb light,
// #abc7ff dark) rather than the SNCF primary the real checkboxes are overridden
// with — so the tick read as "too dark" in light mode and "washed out" in dark.
// We align the pseudo-checkbox selected colours with the primary.
import { describe, it, expect } from 'vitest';
import { compileMdlScss, tokenValues } from './helpers/compile-scss';

describe('option pseudo-checkbox colour', () => {
  const css = compileMdlScss('material/components/option.scss');
  const icon = tokenValues(css, '--mat-pseudo-checkbox-full-selected-icon-color');

  it('uses SNCF blue (#0088ce) in light mode', () => {
    expect(icon).toContain('#0088ce');
  });

  it('drops the azure-palette defaults (#005cbb / #abc7ff)', () => {
    expect(icon).not.toContain('#005cbb');
    expect(icon).not.toContain('#abc7ff');
  });

  it('overrides the minimal pseudo-checkbox checkmark too', () => {
    expect(tokenValues(css, '--mat-pseudo-checkbox-minimal-selected-checkmark-color')).toContain('#0088ce');
  });
});
