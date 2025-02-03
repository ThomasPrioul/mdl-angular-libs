import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ComponentType, TemplatePortal } from '@angular/cdk/portal';

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
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter } from '@angular/material/core';
import {
  MatDatepickerModule,
  MatDateRangePicker,
  MatDatepicker,
  MatDatepickerContent,
  MatCalendar,
} from '@angular/material/datepicker';
import { Subscription, startWith, take } from 'rxjs';
import { DATE_RANGE_PRESETS, DateRangePreset } from '../../utilities';
import { EmptyCalendarHeaderComponent } from '../empty-calendar-header.component';
import { MatListModule } from '@angular/material/list';
import { DoubleCalendarHeaderComponent } from '../double-calendar-header.component';

/**
 * Special component to add as a child of a mat-date-picker to add preset buttons and an optional secondary calendar panel.
 * Forces the user to define action buttons as child content like the mat-picker-actions component.
 */
@Component({
    selector: 'mdl-date-picker',
    styleUrls: ['date-picker.component.scss'],
    templateUrl: 'date-picker.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [MatButtonModule, MatDatepickerModule, EmptyCalendarHeaderComponent, MatListModule]
})
export class MdlDatePicker<D> implements AfterViewInit, OnInit, OnDestroy, OnChanges {
  private _portal!: TemplatePortal;
  private _showPreviousMonthCalendar: boolean = false;
  private originalCalendarType!: ComponentType<any>;
  private sub = new Subscription();

  protected DoubleCalendarHeaderComponent = DoubleCalendarHeaderComponent;
  protected datepicker: MatDateRangePicker<D> | MatDatepicker<D>;
  protected datepickerContent?: MatDatepickerContent<any>;
  protected leftCalendar?: MatCalendar<D>;
  protected srcCalendar?: MatCalendar<D>;

  @Input() public presets?: DateRangePreset<D>[];
  @ViewChild(TemplateRef) public _template!: TemplateRef<unknown>;

  constructor(
    private _viewContainerRef: ViewContainerRef,
    protected dateAdapter: DateAdapter<D>,
    @Optional() private daterangepicker: MatDateRangePicker<D> | null,
    @Optional() private singledatepicker: MatDatepicker<D> | null,
    @Optional() @Inject(DATE_RANGE_PRESETS) private providedPresets: DateRangePreset<D>[] | null
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

        if (this.getCalendarReference()) return;

        this.datepickerContent._animationDone.pipe(take(1)).subscribe(() => {
          if (!this.getCalendarReference()) {
            throw new Error('Could not get calendar reference :-(');
          }
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

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes['showPreviousMonthCalendar']) return;
    this.datepicker.calendarHeaderComponent = this.showPreviousMonthCalendar
      ? EmptyCalendarHeaderComponent
      : this.originalCalendarType;
  }

  public ngOnInit(): void {
    this.originalCalendarType = this.datepicker.calendarHeaderComponent;
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
    if (!this.srcCalendar) {
      console.error('No source calendar!');
      return;
    }

    if (!this.datepickerContent) return;

    if (this.daterangepicker) {
      this.datepickerContent._handleUserSelection({ value: null, event: undefined! });
      this.datepickerContent._handleUserSelection({ value: range.start, event: undefined! });
      this.datepickerContent._handleUserSelection({ value: range.end, event: undefined! });
    } else if (this.singledatepicker) {
      this.datepickerContent._handleUserSelection({ value: range.start, event: undefined! });
    }
  }

  protected registerCalendar(calendar: MatCalendar<any>): void {
    if (!this.leftCalendar) {
      this.leftCalendar = calendar;
      this.sub.add(this.leftCalendar.stateChanges.subscribe(() => this.syncCalendars('left')));
    }
  }

  private getCalendarReference(): boolean {
    // @ts-ignore
    this.srcCalendar = this.datepickerContent._calendar;
    if (!this.srcCalendar) {
      return false;
    }
    this.sub.add(
      this.srcCalendar.stateChanges.pipe(startWith({})).subscribe(() => {
        this.syncCalendars();
      })
    );
    return true;
  }

  private syncCalendars(from: 'left' | 'right' = 'right') {
    if (!this._showPreviousMonthCalendar || !this.leftCalendar || !this.srcCalendar) return;

    const leftCalMonth = this.dateAdapter.getMonth(this.leftCalendar.activeDate);
    const rightCalMonth = this.dateAdapter.getMonth(this.srcCalendar.activeDate);
    if ((leftCalMonth === 11 && rightCalMonth === 0) || leftCalMonth === rightCalMonth - 1) return;
    if (from === 'right') {
      this.leftCalendar.activeDate = this.dateAdapter.addCalendarMonths(
        this.srcCalendar.activeDate,
        -1
      );
    } else {
      this.srcCalendar.activeDate = this.dateAdapter.addCalendarMonths(
        this.leftCalendar.activeDate,
        1
      );
    }
  }
}
