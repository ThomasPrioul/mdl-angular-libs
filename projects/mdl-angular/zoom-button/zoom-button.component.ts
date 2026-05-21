import { booleanAttribute, ChangeDetectionStrategy, Component, forwardRef, model, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'mdl-zoom-button',
  templateUrl: 'zoom-button.component.html',
  styleUrls: ['zoom-button.component.scss'],
  standalone: true,
  imports: [MatTooltipModule, MatIconModule, MatButtonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MdlZoomButtonComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MdlZoomButtonComponent implements ControlValueAccessor {
  /** Whether the control is disabled. model() allows CVA setDisabledState to update it. */
  disabled = model(false);
  maxZoom = input<number>(2);
  minZoom = input<number>(0.8);
  /** Two-way bound zoom level. model() emits zoomValueChange automatically. */
  zoomValue = model<number>(1);

  public getZoomValueString() {
    return (this.zoomValue() * 100).toFixed(0).toString() + ' %';
  }

  public registerOnChange(fn: (v: number) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  public writeValue(zoomValue: number): void {
    this.zoomValue.set(zoomValue);
  }

  protected changeZoom(amount: number) {
    const newVal = parseFloat(
      Math.min(Math.max(this.minZoom(), this.zoomValue() + amount), this.maxZoom()).toFixed(1)
    );
    this.zoomValue.set(newVal);
    this.onChange(newVal);
  }

  protected resetZoom() {
    this.changeZoom(1 - this.zoomValue());
  }

  private onChange: (zoomValue: number) => void = () => {};
  private onTouched: () => void = () => {};
}
