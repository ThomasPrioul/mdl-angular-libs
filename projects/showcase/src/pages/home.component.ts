import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
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
import { SERIES } from '../data/series';
import { Serie } from '../models/serie';
import { SeriesFilterPipe } from '../pipes/series-filter.pipe';
import { SeriesOptionsFilterPipe, SeriesOptionsPipe } from '../pipes/series-options.pipe';
import { parseFunction } from '../utils';
import { ChipsDemoComponent } from '../components/chips-demo/chips-demo.component';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    // NG
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Material
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    // MDL
    MdlCastPipe,
    MdlSelectFilterComponent,
    MdlSelectNoResultsDirective,
    MdlSpinnerComponent,
    MdlTableComponent,
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
export class HomeComponent {
  protected readonly series: Serie[] = SERIES;
  protected readonly seriesControl = new FormControl<string[]>([]);

  protected codeOutput: any;
  protected dataSource = new MatTableDataSource<Serie>();
  protected displayedColumns: ColumnDisplayInfo[] = [
    { name: 'nomTechniqueComplet', canHide: false, visible: true },
    { name: 'typeSerie', canHide: false, visible: true },
    { name: 'codeSerieMateriel', canHide: true, visible: true },
    { name: 'codeLcn', canHide: true, visible: true },
    { name: 'codeSerieMere', canHide: false, visible: true },
  ];
  protected loading = signal<boolean | null>(null);

  protected readonly Serie = () => <Serie>{};

  protected filterChanged(filter: string) {
    this.dataSource.filter = filter;
  }

  protected executeArbitraryCode(code: string) {
    this.codeOutput = parseFunction(code)?.call(undefined);
  }

  protected loadData() {
    this.loading.set(true);
    setTimeout(() => {
      this.dataSource.data = SERIES;
      this.loading.set(false);
    }, 2000);
  }

  protected loadEmptyData() {
    this.loading.set(true);
    setTimeout(() => {
      this.dataSource.data = [];
      this.loading.set(false);
    }, 2000);
  }
}
