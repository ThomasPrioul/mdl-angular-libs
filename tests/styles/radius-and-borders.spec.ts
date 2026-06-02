// Visual contract: 8px popup radius + primary outlined-button border on MD3.
//
// MD3 renamed two tokens the lib only set under their legacy MDC names:
//  - the timepicker popup is a mat-card whose shape was set via
//    `--mdc-elevated-card-container-shape: 8px`; MD3 reads
//    `--mat-card-elevated-container-shape` (default 12px) so the popup lost its
//    intended 8px corners.
//  - primary stroked buttons (datepicker "Annuler") set their outline via
//    `--mdc-outlined-button-outline-color`; MD3 reads
//    `--mat-button-outlined-outline-color` (default --mat-sys-outline, grey),
//    so the border stopped being SNCF primary.
import { describe, it, expect } from 'vitest';
import { compileScss, compileMdlScss, tokenValues } from './helpers/compile-scss';

describe('timepicker popup radius', () => {
  const css = compileScss(
    'projects/mdl-angular/time-picker/components/time-picker/time-picker.component.scss'
  );

  it('sets the MD3 card shape to 8px', () => {
    expect(tokenValues(css, '--mat-card-elevated-container-shape')).toContain('8px');
  });
});

describe('outlined primary button border', () => {
  const css = compileMdlScss('material/components/button.scss');

  it('themes the MD3 outlined-button outline with SNCF primary', () => {
    expect(tokenValues(css, '--mat-button-outlined-outline-color')).toContain('#0088ce');
  });
});
