import { AsyncPipe, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  signal,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  ActionBouttonsType,
  ColumnDisplayInfo,
  MdlTableComponent,
  PaginationType,
  ShouldRequestBackendType,
} from 'mdl-angular/table2';
import { SERIES } from '../../data/series';
import { Serie } from '../../models/serie';
import { MatSortModule, SortDirection } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { TypeSafeMatCellDef } from 'mdl-angular';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { SelectionChange } from '@angular/cdk/collections';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { sortCodeSerieMateriel, sortNomTechniqueComplet } from '../../helpers/materiel-roulant';
import { DateTime } from 'luxon';
import { LuxonModule } from 'luxon-angular';

@Component({
  selector: 'app-table2-demo',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    FormsModule,
    LuxonModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatDividerModule,
    MatIconModule,
    MatSidenavModule,
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
export class Table2DemoComponent implements OnInit {
  private _pagination: PaginationType = 'backend';

  protected DateTime = DateTime;
  protected addonsPosition: 'left' | 'right' = 'left';
  protected dataSource;
  protected displayedColumns: ColumnDisplayInfo<Serie>[] = [
    { name: 'date', canHide: false, sortMember: (serie) => serie.dateCreation.toMillis() },
    {
      name: 'nomTechniqueComplet',
      canHide: false,
      sortFunction: (a, b, dir) =>
        compare(dir, sortNomTechniqueComplet(a.nomTechniqueComplet, b.nomTechniqueComplet)),
    },
    { name: 'typeSerie', canHide: false },
    {
      name: 'codeSerieMateriel',
      sortFunction: (a, b, dir) =>
        compare(dir, sortCodeSerieMateriel(a.codeSerieMateriel, b.codeSerieMateriel)),
    },
    { name: 'codeLcn' },
    { name: 'codeSerieMere', canHide: false },
  ];
  protected loading = signal<boolean | null>(null);
  protected selectedItems = signal<Serie[]>([]);
  protected totalItems = signal<number | undefined>(undefined);

  protected btnsAction: ActionBouttonsType[] = [
    {
      id: 1,
      label: '',
      icon: 'science',
      matTooltip: 'Bouton de test Serge',
      color: 'primary',
      disabledCondition: () => this.totalItems() === 43,
    },
    {
      id: 2,
      label: 'CSV',
      icon: 'content_paste_go',
      matTooltip: 'Exporter les données vers Excel',
      color: 'primary',
      disabledCondition: () => this.totalItems() === 0,
    },
  ];

  @ViewChild(MdlTableComponent, { static: true }) public table!: MdlTableComponent<Serie>;

  constructor(protected el: ElementRef) {
    this.dataSource = new MatTableDataSource<Serie>();
  }

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

  ngOnInit() {
    this.table?.actionFired.subscribe((label: string) => {
      console.log(`Action fired: ${label}`);
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

  protected refreshBackend(lastRefreshDate: Date) {
    const paging = this.table.lastPaginatedRequest;
    if (!paging) return;
    this.requestBackend(paging);
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
              serie.typeSerie.includes(params.searchValue),
          )
        : SERIES;

      const orderBy = params.orderBy as keyof Serie | '' | 'date' | 'selection';

      if (
        orderBy &&
        orderBy !== 'dateCreation' &&
        orderBy !== 'selection' &&
        params.orderDirection !== ''
      ) {
        newItems.sort((serie1, serie2) => {
          const sortFunction = this.displayedColumns.find((c) => c.name === orderBy)?.sortFunction;
          if (sortFunction) {
            return sortFunction(serie1, serie2, params.orderDirection);
          }

          let comparison: number;
          if (orderBy === 'date') {
            comparison = serie1.dateCreation.toMillis() - serie2.dateCreation.toMillis();
          } else {
            comparison = (serie1[orderBy] ?? '').localeCompare(serie2[orderBy] ?? '');
          }
          return params.orderDirection === 'desc' ? -comparison : comparison;
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

function compare(dir: SortDirection, value: number) {
  return dir === '' ? 0 : value * (dir === 'asc' ? 1 : -1);
}
