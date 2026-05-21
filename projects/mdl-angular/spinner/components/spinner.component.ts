import { booleanAttribute, numberAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type WcsSpinnerMode = 'border' | 'growing';

@Component({
  selector: 'mdl-spinner',
  template: `<svg viewBox="0 0 50 50">
    <circle class="dashed-background-circle" cx="25" cy="25" r="21" fill="none" />
    <g class="infinite-rotation-container">
      <circle class="dash-rotating-circle" cx="25" cy="25" r="21" fill="none" />
    </g>
  </svg> `,
  styleUrls: ['spinner.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.height.px]': 'effectiveDiameter()',
    '[style.width.px]': 'effectiveDiameter()',
    '[style.--base-stroke-width.px]': 'effectiveStrokeWidth()',
    '[class.overlay-spinner]': 'overlay()',
  },
})
export class MdlSpinnerComponent {
  /**
   * Indicates the spinner display mode.
   * Accepted values: `border` or `growing`
   */
  mode = input<WcsSpinnerMode>('border');

  /** When true, forces diameter=28 and strokeWidth=9. */
  overlay = input(false, { transform: booleanAttribute });
  diameter = input(32, { transform: numberAttribute });
  strokeWidth = input(8, { transform: numberAttribute });

  /** Effective diameter: 28 when overlay, otherwise the diameter input. */
  protected effectiveDiameter = computed(() => (this.overlay() ? 28 : this.diameter()));
  /** Effective stroke width: 9 when overlay, otherwise the strokeWidth input. */
  protected effectiveStrokeWidth = computed(() => (this.overlay() ? 9 : this.strokeWidth()));
}
