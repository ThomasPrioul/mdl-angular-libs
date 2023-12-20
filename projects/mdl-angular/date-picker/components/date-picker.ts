import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { TemplatePortal } from '@angular/cdk/portal';
import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
  Optional,
  Input,
  ComponentRef,
  Inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter } from '@angular/material/core';
import {
  MatDatepickerModule,
  MatDateRangePicker,
  MatDatepicker,
  MatDatepickerContent,
  MatCalendar,
} from '@angular/material/datepicker';
import { Subscription, startWith } from 'rxjs';
import { DATE_RANGE_PRESETS, DateRangePreset } from '../utilities';
import { EmptyCalendarHeaderComponent } from './empty-calendar-header.component';

/**
 * Special component to add as a child of a mat-date-picker to add preset buttons and an optional secondary calendar panel.
 * Forces the user to define action buttons as child content like the mat-picker-actions component.
 */
@Component({
  selector: 'mdl-date-picker',
  styleUrls: ['date-picker.scss'],
  templateUrl: 'date-picker.html',
  imports: [NgIf, NgFor, MatButtonModule, MatDatepickerModule, EmptyCalendarHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class MdlDatePicker<D> implements AfterViewInit, OnDestroy {
  private _portal!: TemplatePortal;
  private _showPreviousMonthCalendar: boolean = false;
  private sub = new Subscription();

  protected EmptyCalendarHeaderComponent = EmptyCalendarHeaderComponent;
  protected datepicker: MatDateRangePicker<D> | MatDatepicker<D>;
  protected datepickerContent?: any;
  protected leftCalendar?: MatCalendar<D>;
  protected srcCalendar?: MatCalendar<D>;

  @Input() presets?: DateRangePreset<D>[];
  @ViewChild(TemplateRef) _template!: TemplateRef<unknown>;

  constructor(
    @Optional() private daterangepicker: MatDateRangePicker<D> | null,
    @Optional() private singledatepicker: MatDatepicker<D> | null,
    protected dateAdapter: DateAdapter<D>,
    private _viewContainerRef: ViewContainerRef,
    @Optional() @Inject(DATE_RANGE_PRESETS) private providedPresets?: DateRangePreset<D>[]
  ) {
    if (singledatepicker === null && daterangepicker === null) {
      throw new Error(
        'Please use this component inside a mat-date-picker or mat-date-range-picker'
      );
    }
    this.datepicker = singledatepicker ?? daterangepicker!;
    this.sub.add(
      this.datepicker.openedStream.subscribe(() => {
        // @ts-ignore
        (this.datepicker._overlayRef as OverlayRef).addPanelClass('with-presets');

        this.datepickerContent = // @ts-ignore
          (this.datepicker._componentRef as ComponentRef<MatDatepickerContent<any, any>>).instance;
        setTimeout(() => {
          // @ts-ignore
          this.srcCalendar = this.datepickerContent._calendar;
          if (!this.srcCalendar) return;
          this.sub.add(
            this.srcCalendar.stateChanges.pipe(startWith({})).subscribe(() => {
              this.syncCalendars();
            })
          );
        });
      })
    );
    this.sub.add(
      this.datepicker.closedStream.subscribe(() => {
        this.datepickerContent = undefined;
        this.srcCalendar = undefined;
        this.leftCalendar = undefined;
      })
    );
  }

  @Input()
  public get showPreviousMonthCalendar(): BooleanInput {
    return this._showPreviousMonthCalendar;
  }

  public set showPreviousMonthCalendar(value: BooleanInput) {
    this._showPreviousMonthCalendar = coerceBooleanProperty(value);
  }

  protected get presetsToShow() {
    return this.presets ?? this.providedPresets;
  }

  public ngAfterViewInit() {
    this._portal = new TemplatePortal(this._template, this._viewContainerRef);
    this.datepicker.registerActions(this._portal);
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();

    this.datepicker.removeActions(this._portal);

    // Needs to be null checked since we initialize it in `ngAfterViewInit`.
    if (this._portal && this._portal.isAttached) {
      this._portal?.detach();
    }
  }

  protected applyPreset(preset: DateRangePreset<D>) {
    const range = preset.calculateDateRange(this.dateAdapter);
    if (!this.srcCalendar) return;
    if (this.daterangepicker) {
      this.datepickerContent._handleUserSelection({ value: null });
      this.datepickerContent._handleUserSelection({ value: range.start });
      this.datepickerContent._handleUserSelection({ value: range.end });
    } else if (this.singledatepicker) {
      this.datepickerContent._handleUserSelection({ value: range.start });
    }
  }

  protected registerCalendar(calendar: MatCalendar<any>): void {
    if (!this.leftCalendar) {
      this.leftCalendar = calendar;
      this.syncCalendars();
    }
  }

  private syncCalendars() {
    if (!this._showPreviousMonthCalendar || !this.leftCalendar || !this.srcCalendar) return;
    this.leftCalendar.activeDate = this.dateAdapter.addCalendarMonths(
      this.srcCalendar.activeDate,
      -1
    );
  }
}
