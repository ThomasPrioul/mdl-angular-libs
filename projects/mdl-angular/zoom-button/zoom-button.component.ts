import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'mdl-zoom-button',
    templateUrl: 'zoom-button.component.html',
    styleUrls: ['zoom-button.component.scss'],
    imports: [MatTooltipModule, MatIconModule, MatButtonModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MdlZoomButtonComponent),
            multi: true,
        },
    ]
})
export class MdlZoomButtonComponent implements ControlValueAccessor {
  @Input() public disabled = false;
  @Input() public maxZoom = 2;
  @Input() public minZoom = 0.8;
  @Input() public zoomValue: number = 1;
  @Output() public zoomValueChange = new EventEmitter<number>();

  public getZoomValueString() {
    return (this.zoomValue * 100).toFixed(0).toString() + ' %';
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public writeValue(zoomValue: number): void {
    this.zoomValue = zoomValue;
  }

  protected changeZoom(amount: number) {
    this.zoomValueChange.emit(
      (this.zoomValue = parseFloat(
        Math.min(Math.max(this.minZoom, this.zoomValue + amount), this.maxZoom).toFixed(1)
      ))
    );
    this.onChange(this.zoomValue);
  }

  protected resetZoom() {
    this.changeZoom(1 - this.zoomValue);
  }

  private onChange: (zoomValue: number) => void = () => {};

  private onTouched: () => void = () => {};
}
