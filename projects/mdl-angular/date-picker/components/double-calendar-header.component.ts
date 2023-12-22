import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { Subject, takeUntil } from 'rxjs';

/** Custom header component for datepicker. */
@Component({
  selector: 'mdl-double-calendar-header',
  styles: [
    `
      :host {
        display: block;
        position: relative;
        height: 64px;
        width: 100%;
      }

      .content-host {
        position: absolute;
        top: 0;
        left: 0;
        width: 200%;
        height: 48px;
        display: flex;
        align-items: center;
        padding: 0.5em;
      }

      .header-label {
        flex: 1;
        height: 1em;
        font-weight: 500;
        text-align: center;
      }
    `,
  ],
  template: `
    <div class="content-host">
      <button mat-icon-button (click)="previousClicked('year')">
        <mat-icon>keyboard_double_arrow_left</mat-icon>
      </button>
      <button mat-icon-button (click)="previousClicked('month')">
        <mat-icon>keyboard_arrow_left</mat-icon>
      </button>
      <span class="header-label">{{ periodLabel }}</span>
      <button mat-icon-button (click)="nextClicked('month')">
        <mat-icon>keyboard_arrow_right</mat-icon>
      </button>
      <button mat-icon-button (click)="nextClicked('year')">
        <mat-icon>keyboard_double_arrow_right</mat-icon>
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
})
export class DoubleCalendarHeaderComponent<D> implements OnDestroy {
  private _destroyed = new Subject<void>();

  constructor(
    private _calendar: MatCalendar<D>,
    private _dateAdapter: DateAdapter<D>,
    @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
    cdr: ChangeDetectorRef
  ) {
    _calendar.stateChanges.pipe(takeUntil(this._destroyed)).subscribe(() => cdr.markForCheck());
  }

  public get periodLabel() {
    return `${this._dateAdapter
      .format(this._calendar.activeDate, this._dateFormats.display.monthYearLabel)
      .toLocaleUpperCase()} - ${this._dateAdapter
      .format(
        this._dateAdapter.addCalendarMonths(this._calendar.activeDate, 1),
        this._dateFormats.display.monthYearLabel
      )
      .toLocaleUpperCase()}`;
  }

  public ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  public nextClicked(mode: 'month' | 'year') {
    const newDate =
      mode === 'month'
        ? this._dateAdapter.addCalendarMonths(this._calendar.activeDate, 1)
        : this._dateAdapter.addCalendarYears(this._calendar.activeDate, 1);

    if (!this._calendar.maxDate) {
      this._calendar.activeDate = newDate;
      return;
    }

    const maxAcceptableDate = this._dateAdapter.addCalendarMonths(this._calendar.maxDate, -1);
    const inBounds = this._dateAdapter.compareDate(newDate, maxAcceptableDate!) <= 0;

    this._calendar.activeDate = inBounds ? newDate : maxAcceptableDate;
  }

  public previousClicked(mode: 'month' | 'year') {
    const newDate =
      mode === 'month'
        ? this._dateAdapter.addCalendarMonths(this._calendar.activeDate, -1)
        : this._dateAdapter.addCalendarYears(this._calendar.activeDate, -1);

    if (!this._calendar.minDate) {
      this._calendar.activeDate = newDate;
      return;
    }

    const minAcceptableDate = this._calendar.minDate;
    const inBounds = this._dateAdapter.compareDate(newDate, minAcceptableDate!) >= 0;

    this._calendar.activeDate = inBounds ? newDate : minAcceptableDate;
  }
}
