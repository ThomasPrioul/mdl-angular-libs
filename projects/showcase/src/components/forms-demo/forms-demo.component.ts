import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_LUXON_DATE_FORMATS, MatLuxonDateModule } from '@angular/material-luxon-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MdlCastPipe, TypeSafeMatCellDef } from 'mdl-angular';
import {
  MdlSelectFilterComponent,
  MdlSelectNoResultsDirective,
  MdlSelectAllDirective,
  MdlSelectClearAllDirective,
  MdlSelectGlobalCheckboxDirective,
} from 'mdl-angular/select';
import { MdlSpinnerComponent } from 'mdl-angular/spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  MdlTreeItemHiddenPipe,
  MdlTreeOptionComponent,
  MdlTreeSelectDirective,
  MdlTreeSelectSummaryPipe,
} from 'mdl-angular/tree-select';
import { MdlZoomButtonComponent } from 'mdl-angular/zoom-button';
import { SeriesFilterPipe } from '../../pipes/series-filter.pipe';
import { SeriesOptionsFilterPipe, SeriesOptionsPipe } from '../../pipes/series-options.pipe';
import { SERIES } from '../../data/series';
import { sortNomTechniqueComplet } from '../../helpers/materiel-roulant';
import { Serie } from '../../models/serie';
import { parseFunction } from '../../utils';
import { ChipsDemoComponent } from '../chips-demo/chips-demo.component';
import { DATE_RANGE_PRESETS, DateRangePreset, MdlDatePicker } from 'mdl-angular/date-picker';
import { DateTime } from 'luxon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { startWith } from 'rxjs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DEFAULT_DATEFORMAT_PROVIDER } from '../../app/app.config';
import { DateAdapter } from '@angular/material/core';
import { DemoDateAdapter } from '../../helpers/custom-date.adapter';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationService } from '../../services/notification.service';
import { MdlTimePickerComponent } from 'mdl-angular/time-picker';

const DEMO_DATE_RANGE_PRESETS: DateRangePreset<DateTime>[] = [
  {
    name: "Aujourd'hui",
    calculateDateRange: (dateAdapter) => {
      let today = dateAdapter.today().set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
      return { start: today, end: today };
    },
  },
  {
    name: 'Hier',
    calculateDateRange: (dateAdapter) => {
      let yesterday = dateAdapter
        .today()
        .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        .minus({ day: 1 });
      return { start: yesterday, end: yesterday };
    },
  },
  {
    name: '7 derniers jours',
    calculateDateRange: (dateAdapter) => {
      let today = dateAdapter.today().set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
      return { start: today.minus({ day: 7 }), end: today };
    },
  },
  {
    name: 'Le mois dernier',
    calculateDateRange: (dateAdapter) => {
      let today = dateAdapter.today().set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
      return { start: today.minus({ month: 1 }), end: today };
    },
  },
  {
    name: '3 derniers mois',
    calculateDateRange: (dateAdapter) => {
      let today = dateAdapter.today().set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
      return { start: today.minus({ month: 3 }), end: today };
    },
  },
  {
    name: '6 derniers mois',
    calculateDateRange: (dateAdapter) => {
      let today = dateAdapter.today().set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
      return { start: today.minus({ month: 6 }), end: today };
    },
  },
  {
    name: '12 derniers mois',
    calculateDateRange: (dateAdapter) => {
      let today = dateAdapter.today().set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
      return { start: today.minus({ month: 12 }), end: today };
    },
  },
  {
    name: '18 derniers mois',
    calculateDateRange: (dateAdapter) => {
      let today = dateAdapter.today().set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
      return { start: today.minus({ month: 18 }), end: today };
    },
  },
];

const today = DateTime.now().startOf('day');

@Component({
  selector: 'app-forms-demo',
  standalone: true,
  templateUrl: './forms-demo.component.html',
  styleUrls: ['./forms-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    // NG
    JsonPipe,
    FormsModule,
    ReactiveFormsModule,
    // Material
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatLuxonDateModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTooltipModule,
    // MDL
    MdlCastPipe,
    MdlDatePicker,
    MdlSelectGlobalCheckboxDirective,
    MdlSelectAllDirective,
    MdlSelectClearAllDirective,
    MdlSelectFilterComponent,
    MdlSelectNoResultsDirective,
    MdlSpinnerComponent,
    MdlTimePickerComponent,
    MdlTreeItemHiddenPipe,
    MdlTreeOptionComponent,
    MdlTreeSelectDirective,
    MdlTreeSelectSummaryPipe,
    MdlZoomButtonComponent,
    TypeSafeMatCellDef,
    // App
    SeriesFilterPipe,
    SeriesOptionsFilterPipe,
    SeriesOptionsPipe,
    ChipsDemoComponent,
  ],
  providers: [
    { provide: DATE_RANGE_PRESETS, useValue: DEMO_DATE_RANGE_PRESETS },

    DEFAULT_DATEFORMAT_PROVIDER,
    {
      provide: DateAdapter,
      useClass: DemoDateAdapter,
    },
  ],
})
export class FormsDemoComponent {
  protected readonly transilienLines = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "H",
    "J",
    "K",
    "L",
    "N",
    "U",
    "R",
  ];

  protected readonly dateForm = new FormGroup(
    {
      start: new FormControl<DateTime | null>(null),
      end: new FormControl<DateTime | null>(null),
      single: new FormControl<DateTime | null>(today),
    },
    { updateOn: 'blur' }
  );
  protected readonly form = new FormGroup({
    login: new FormControl<string>(''),
    password: new FormControl<string>(''),
  });
  protected readonly maxDate = today.plus({ month: 3 });
  protected readonly minDate = today.minus({ month: 3 });
  protected readonly selectedTime = new FormControl<string | null>(null);
  protected readonly series: Serie[] = SERIES.sort((a, b) =>
    sortNomTechniqueComplet(a.nomTechniqueComplet, b.nomTechniqueComplet)
  );
  protected readonly seriesControl = new FormControl<string[]>([]);
  protected readonly today = today;

  protected codeOutput: any;
  protected notifications = inject(NotificationService);

  constructor() {
    this.dateForm.valueChanges.pipe(startWith(() => this.dateForm.getRawValue())).subscribe(() => {
      console.log('dateForm:', this.dateForm.getRawValue());
    });
  }

  public getErrorMessage() {
    return JSON.stringify(this.dateForm.controls.single.errors);
  }

  protected readonly Serie = () => <Serie>{};

  protected executeArbitraryCode(code: string) {
    this.codeOutput = parseFunction(code)?.call(undefined);
  }

  protected onPasteTest(event: ClipboardEvent) {
    event.stopPropagation();
    event.preventDefault();
    console.log('intercepted paste!');
  }

  protected onSelectionChange(event: MatSelectChange) {
    //console.log(event);
  }

  protected toggleForm() {
    if (this.form.enabled) this.form.disable();
    else this.form.enable();
  }
}
