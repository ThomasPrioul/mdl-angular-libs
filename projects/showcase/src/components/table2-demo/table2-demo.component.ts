import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  ColumnDisplayInfo,
  MdlTableComponent,
  PaginationType,
  ShouldRequestBackendType,
} from 'mdl-angular/table2';
import { SERIES } from '../../data/series';
import { Serie } from '../../models/serie';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { TypeSafeMatCellDef } from 'mdl-angular';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { SelectionChange } from '@angular/cdk/collections';

@Component({
  selector: 'app-table2-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTableModule,
    MdlTableComponent,
    TypeSafeMatCellDef,
  ],
  templateUrl: './table2-demo.component.html',
  styleUrls: ['./table2-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Table2DemoComponent {
  private _pagination: PaginationType = 'backend';

  protected dataSource = new MatTableDataSource<Serie>();
  protected displayedColumns: ColumnDisplayInfo[] = [
    { name: 'nomTechniqueComplet', canHide: false },
    { name: 'typeSerie', canHide: false },
    { name: 'codeSerieMateriel' },
    { name: 'codeLcn' },
    { name: 'codeSerieMere', canHide: false },
  ];
  protected loading = signal<boolean | null>(null);
  protected totalItems = signal<number | undefined>(undefined);
  protected selectedItems = signal<Serie[]>([]);

  protected get pagination(): PaginationType {
    return this._pagination;
  }

  protected set pagination(value: PaginationType) {
    this._pagination = value;
    setTimeout(() => {
      if (value !== 'backend') {
        this.dataSource.data = SERIES;
      }
    });
  }

  protected filterChanged(filter: string) {
    if (this.pagination != 'backend') this.dataSource.filter = filter;
  }

  protected loadData() {
    this.loading.set(true);
    setTimeout(() => {
      this.dataSource.data = SERIES;
      this.loading.set(false);
    }, 1000);
  }

  protected loadEmptyData() {
    this.loading.set(true);
    setTimeout(() => {
      this.dataSource.data = [];
      this.loading.set(false);
    }, 1000);
  }

  protected requestBackend(params: ShouldRequestBackendType) {
    this.loading.set(true);
    setTimeout(() => {
      const newItems = params.searchValue
        ? SERIES.filter(
            (serie) =>
              serie.codeLcn.includes(params.searchValue) ||
              serie.codeSerieMateriel.includes(params.searchValue) ||
              serie.codeSerieMere?.includes(params.searchValue) ||
              serie.nomTechniqueComplet.includes(params.searchValue) ||
              serie.typeSerie.includes(params.searchValue)
          )
        : SERIES;

      if (params.orderBy && params.orderDirection !== '') {
        newItems.sort((serie1, serie2) => {
          const comparison = ((serie1 as any)[params.orderBy] as string).localeCompare(
            (serie2 as any)[params.orderBy] as string
          );
          return params.orderDirection === 'asc' ? comparison : -comparison;
        });
      }

      const start = (params.pageNum - 1) * params.pageSize;
      const end = start + params.pageSize;
      this.dataSource.data = newItems.slice(start, end);
      this.totalItems.set(newItems.length);
      this.loading.set(false);
    }, 500);
  }

  protected selectionChanged(event: SelectionChange<Serie>) {
    this.selectedItems.set(event.source.selected);
  }
}
