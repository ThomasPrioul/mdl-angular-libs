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
  Inject,
  Optional,
  Input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter } from '@angular/material/core';
import {
  MatDatepickerModule,
  MatDateRangePicker,
  MatDatepicker,
  MatCalendarView,
} from '@angular/material/datepicker';
import { Subscription } from 'rxjs';

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
  private _datepicker: MatDateRangePicker<any> | MatDatepicker<any>;
  private _portal!: TemplatePortal;
  private _showPreviousMonthCalendar: boolean = false;
  private sub = new Subscription();

  protected EmptyCalendarHeaderComponent = EmptyCalendarHeaderComponent;

  @ViewChild(TemplateRef) _template!: TemplateRef<unknown>;

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
    this._datepicker = datepicker ?? daterangepicker!;
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
    this._datepicker.registerActions(this._portal);
    this.sub = this._datepicker.openedStream.subscribe(() => {
      // @ts-ignore
      (this._datepicker._overlayRef as OverlayRef).addPanelClass('with-presets');
    });
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();

    this._datepicker.removeActions(this._portal);

    // Needs to be null checked since we initialize it in `ngAfterViewInit`.
    if (this._portal && this._portal.isAttached) {
      this._portal?.detach();
    }
  }
}
