// Visual contract: default icon buttons are legible in dark mode.
//
// The m2 icon-button color mixin leaves the default `--mat-icon-button-icon-
// color` as `inherit`, which resolves to black in containers that don't set a
// light text colour in dark mode (e.g. the table2 header toolbar, the settings
// drawer close button) — so non-primary icon buttons rendered black on a dark
// surface. Pin the dark icon colour to a light on-surface value. `.mat-primary`
// icon buttons keep their own (more specific) colour.
import { describe, it, expect } from 'vitest';
import { compileMdlScss, tokenValues } from './helpers/compile-scss';

describe('icon-button foreground in dark mode', () => {
  const css = compileMdlScss('material/components/button.scss');

  it('pins a light dark-mode icon colour instead of relying on inherit', () => {
    expect(tokenValues(css, '--mat-icon-button-icon-color')).toContain('#f2f2f2');
  });
});
