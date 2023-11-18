import {
  BooleanInput,
  NumberInput,
  coerceBooleanProperty,
  coerceNumberProperty,
} from '@angular/cdk/coercion';
import { Component, HostBinding, Input } from '@angular/core';

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
})
export class MdlSpinnerComponent {
  /**
   * Indicates the spinner display mode.
   * Accepted values: `border` or `growing`
   */
  @Input() public mode: WcsSpinnerMode = 'border';

  private _diameter: number = 32;
  private _strokeWidth: number = 8;
  private _overlay: boolean = false;

  @HostBinding('class.overlay-spinner')
  @Input()
  public get overlay() {
    return this._overlay;
  }

  public set overlay(value: BooleanInput) {
    this._overlay = coerceBooleanProperty(value);
    this.diameter = 28;
    this.strokeWidth = 9;
  }

  @HostBinding('style.height.px')
  @HostBinding('style.width.px')
  @Input()
  public get diameter() {
    return this._diameter;
  }
  public set diameter(value: NumberInput) {
    this._diameter = coerceNumberProperty(value);
  }

  @HostBinding('style.--base-stroke-width.px')
  @Input()
  public get strokeWidth() {
    return this._strokeWidth;
  }
  public set strokeWidth(value: NumberInput) {
    this._strokeWidth = coerceNumberProperty(value);
  }
}
