import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MdlCastPipe, TypeSafeMatCellDef } from 'mdl-angular';
import { MdlSelectFilterComponent, MdlSelectNoResultsDirective } from 'mdl-angular/select-filter';
import { MdlSpinnerComponent } from 'mdl-angular/spinner';
import { ColumnDisplayInfo, MdlTableComponent } from 'mdl-angular/table2';
import {
  MdlTreeItemHiddenPipe,
  MdlTreeOptionComponent,
  MdlTreeSelectDirective,
  MdlTreeSelectSummaryPipe,
} from 'mdl-angular/tree-select';
import { MdlZoomButtonComponent } from 'mdl-angular/zoom-button';
import { ChipsDemoComponent } from '../components/chips-demo/chips-demo.component';
import { SERIES } from '../data/series';
import { sortNomTechniqueComplet } from '../helpers/materiel-roulant';
import { Serie } from '../models/serie';
import { SeriesFilterPipe } from '../pipes/series-filter.pipe';
import { SeriesOptionsFilterPipe, SeriesOptionsPipe } from '../pipes/series-options.pipe';
import { parseFunction } from '../utils';
import { MatLuxonDateModule } from '@angular/material-luxon-adapter';
import { Table2DemoComponent } from '../components/table2-demo/table2-demo.component';
import { FormsDemoComponent } from '../components/forms-demo/forms-demo.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    // NG
    CommonModule,
    RouterLinkActive,
    RouterLink,
    RouterOutlet,

    // Material
    MatTabsModule,

    Table2DemoComponent,
    FormsDemoComponent,
  ],
})
export class HomeComponent {}
