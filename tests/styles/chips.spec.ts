// Visual contract: autocomplete/input chips keep high contrast in light mode.
//
// v1 rendered form-field chips with a dark background and white text. The MD3
// migration added a light-grey override (`--mat-chip-elevated-container-color:
// cool-gray-3`, dark label) that killed the contrast — the chip and its remove
// "x" became barely visible on a light field. Restore the dark background with
// white label + white remove icon.
import { describe, it, expect } from 'vitest';
import { compileMdlScss, tokenValues } from './helpers/compile-scss';

describe('chips contrast (light mode form-field chips)', () => {
  const css = compileMdlScss('material/components/chips.scss');

  it('uses a dark container (#333) for light-mode form-field chips', () => {
    expect(tokenValues(css, '--mat-chip-elevated-container-color')).toContain('#333');
  });

  it('keeps the chip label white for contrast', () => {
    expect(tokenValues(css, '--mat-chip-label-text-color')).toContain('#fff');
  });

  it('keeps the remove (x) icon visible (white)', () => {
    expect(tokenValues(css, '--mat-chip-with-trailing-icon-trailing-icon-color')).toContain('#fff');
  });
});
