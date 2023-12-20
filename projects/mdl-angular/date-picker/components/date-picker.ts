import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { TemplatePortal } from '@angular/cdk/portal';
import { NgIf } from '@angular/common';
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
  OnInit,
  ChangeDetectorRef,
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

@Component({
  selector: 'mdl-empty-calendar-header',
  template: '',
  styles: [
    `
      :host {
        height: 64px;
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class EmptyCalendarHeaderComponent {}

/**
 * Special component to add as a child of a date picker to add presets on the left, works the same as mat-picker-actions for the ng-content.
 */
@Component({
  selector: 'mdl-date-picker',
  styleUrls: ['date-picker.scss'],
  templateUrl: 'date-picker.html',
  imports: [NgIf, MatButtonModule, MatDatepickerModule, EmptyCalendarHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class MdlDatePicker implements AfterViewInit, OnDestroy {
  private _portal!: TemplatePortal;
  private _showPreviousMonthCalendar: boolean = false;
  protected srcCalendar?: MatCalendar<any>;
  private sub = new Subscription();

  protected EmptyCalendarHeaderComponent = EmptyCalendarHeaderComponent;
  protected datepicker: MatDateRangePicker<any> | MatDatepicker<any>;
  protected leftCalendar?: MatCalendar<any>;

  @ViewChild(TemplateRef) _template!: TemplateRef<unknown>;

  protected datepickerContent?: any;

  constructor(
    @Optional() daterangepicker: MatDateRangePicker<any> | null,
    @Optional() datepicker: MatDatepicker<any> | null,
    protected dateAdapter: DateAdapter<any>,
    private _viewContainerRef: ViewContainerRef
  ) {
    if (datepicker === null && daterangepicker === null) {
      throw new Error(
        'Please use this component inside a mat-date-picker or mat-date-range-picker'
      );
    }
    this.datepicker = datepicker ?? daterangepicker!;
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
