// Visual contract: the MDL switch has no track outline.
//
// MD3 draws a 2px outline around the *unselected* switch track
// (`--mat-slide-toggle-track-outline-width: 2px`, color #74777f). MD2 had no
// such border, and the MDL switch uses a custom compact handle where the
// outline looks wrong. We zero the outline so the switch matches v1.
import { describe, it, expect } from 'vitest';
import { compileMdlScss, ruleBody } from './helpers/compile-scss';

describe('slide-toggle (switch) track outline', () => {
  const css = compileMdlScss('material/components/slide-toggle.scss');
  const sw = ruleBody(css, 'button.mdc-switch');

  it('removes the unselected track outline added by MD3', () => {
    expect(sw).toMatch(/--mat-slide-toggle-track-outline-width:\s*0/);
  });

  it('removes the disabled unselected track outline too', () => {
    expect(sw).toMatch(/--mat-slide-toggle-disabled-unselected-track-outline-width:\s*0/);
  });
});
