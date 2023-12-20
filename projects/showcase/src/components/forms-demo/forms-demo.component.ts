import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLuxonDateModule } from '@angular/material-luxon-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MdlCastPipe, TypeSafeMatCellDef } from 'mdl-angular';
import { MdlSelectFilterComponent, MdlSelectNoResultsDirective } from 'mdl-angular/select-filter';
import { MdlSpinnerComponent } from 'mdl-angular/spinner';
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
import { MdlDatePicker } from 'mdl-angular/date-picker';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-forms-demo',
  standalone: true,
  templateUrl: './forms-demo.component.html',
  styleUrls: ['./forms-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    // NG
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Material
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatLuxonDateModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTooltipModule,
    // MDL
    MdlCastPipe,
    MdlDatePicker,
    MdlSelectFilterComponent,
    MdlSelectNoResultsDirective,
    MdlSpinnerComponent,
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
})
export class FormsDemoComponent {
  protected readonly form = new FormGroup({
    login: new FormControl<string>(''),
    password: new FormControl<string>(''),
  });
  protected readonly dateForm = new FormGroup({
    start: new FormControl<DateTime | null>(null),
    end: new FormControl<DateTime | null>(null),
  });
  protected readonly today = DateTime.now();
  protected readonly maxDate = DateTime.now().plus({ week: 1 });
  protected readonly minDate = DateTime.now().minus({ month: 3 });
  protected readonly series: Serie[] = SERIES.sort((a, b) =>
    sortNomTechniqueComplet(a.nomTechniqueComplet, b.nomTechniqueComplet)
  );
  protected readonly seriesControl = new FormControl<string[]>([]);

  protected codeOutput: any;

  protected readonly Serie = () => <Serie>{};

  protected executeArbitraryCode(code: string) {
    this.codeOutput = parseFunction(code)?.call(undefined);
  }

  protected toggleForm() {
    if (this.form.enabled) this.form.disable();
    else this.form.enable();
  }
}
