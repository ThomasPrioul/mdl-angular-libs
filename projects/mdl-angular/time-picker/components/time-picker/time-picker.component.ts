import { OverlayModule } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { matMenuAnimations } from '@angular/material/menu';
import { MatListModule, MatSelectionList } from '@angular/material/list';
@Component({
  selector: 'mdl-time-picker',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    OverlayModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './time-picker.component.html',
  styleUrl: './time-picker.component.scss',
  animations: [matMenuAnimations.transformMenu],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MdlTimePickerComponent),
      multi: true,
    },
  ],
})
export class MdlTimePickerComponent implements ControlValueAccessor {
  private _overlayOpen: boolean = false;

  protected time = new FormGroup({
    hours: new FormControl<string | null>(null),
    minutes: new FormControl<string | null>(null),
    seconds: new FormControl<string | null>(null),
  });

  public selectedTime: string | null = null;

  public get overlayOpen() {
    return this._overlayOpen;
  }

  public set overlayOpen(value: boolean) {
    this._overlayOpen = value;
  }

  public onChange: (value: string | null) => void = () => {};

  public onTouched: () => void = () => {};

  public registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public selectTime(time: string | null) {
    this.selectedTime = time;
    this.onChange(time);
  }

  public submit(hours: MatSelectionList, minutes: MatSelectionList, seconds: MatSelectionList) {
    this.selectTime(
      `${this.time.value.hours}:${this.time.value.minutes}:${this.time.value.seconds}`
    );
    this.overlayOpen = false;
  }

  public writeValue(value: string | null): void {
    this.selectedTime = value;
    const tokens = value?.split(':');
    this.time.setValue({
      hours: tokens?.[0] ?? null,
      minutes: tokens?.[1] ?? null,
      seconds: tokens?.[2] ?? null,
    });
  }
}
