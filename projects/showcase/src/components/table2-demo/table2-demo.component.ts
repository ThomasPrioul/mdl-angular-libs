import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ColumnDisplayInfo, MdlTableComponent } from 'mdl-angular/table2';
import { SERIES } from '../../data/series';
import { Serie } from '../../models/serie';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { TypeSafeMatCellDef } from 'mdl-angular';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-table2-demo',
  standalone: true,
  imports: [
    CommonModule,
    MdlTableComponent,
    MatButtonModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTableModule,
    TypeSafeMatCellDef,
  ],
  templateUrl: './table2-demo.component.html',
  styleUrls: ['./table2-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Table2DemoComponent {
  protected dataSource = new MatTableDataSource<Serie>();
  protected displayedColumns: ColumnDisplayInfo[] = [
    { name: 'nomTechniqueComplet', canHide: false },
    { name: 'typeSerie', canHide: false },
    { name: 'codeSerieMateriel' },
    { name: 'codeLcn' },
    { name: 'codeSerieMere', canHide: false },
  ];
  protected loading = signal<boolean | null>(null);

  protected filterChanged(filter: string) {
    this.dataSource.filter = filter;
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
