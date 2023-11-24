import { ChangeDetectionStrategy, Component, Pipe, PipeTransform, signal } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ColumnDisplayInfo, MdlTableComponent } from 'mdl-angular/table2';
import { parseFunction } from '../utils';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MdlZoomButtonComponent } from 'mdl-angular/zoom-button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { Serie } from '../models/serie';
import { PeriodicElement } from '../models/periodic-element';
import { MdlSelectFilterComponent, MdlSelectNoResultsDirective } from 'mdl-angular/select-filter';

const SERIES: Serie[] = [
  {
    identifiantSiSerie: 431,
    codeLcn: 'Z2N',
    codeSerieMateriel: 'Z5600',
    codeSerieMere: null,
    typeSerie: 'Série',
    nomTechniqueComplet: 'Z 5600',
  },
  {
    identifiantSiSerie: 1874,
    codeLcn: 'Z2N',
    codeSerieMateriel: 'Z5600--6C--NRF',
    codeSerieMere: 'Z5600--6C',
    typeSerie: 'Variante',
    nomTechniqueComplet: 'Z 5600 \\ 6 caisses \\ NON RENFORCEE FREINAGE',
  },
  {
    identifiantSiSerie: 432,
    codeLcn: 'Z2N',
    codeSerieMateriel: 'Z5600--4C',
    codeSerieMere: 'Z5600',
    typeSerie: 'Sous-Série',
    nomTechniqueComplet: 'Z 5600 \\ 4 caisses',
  },
  {
    identifiantSiSerie: 1876,
    codeLcn: 'Z2N',
    codeSerieMateriel: 'Z20500-4C--HNRF',
    codeSerieMere: 'Z20500-4C',
    typeSerie: 'Variante',
    nomTechniqueComplet: 'Z 20500 \\ 4 caisses \\ HYBRIDE NON RENFORCEE FREINAGE',
  },
  {
    identifiantSiSerie: 1879,
    codeLcn: 'Z2N',
    codeSerieMateriel: 'Z20500-5C--NRF',
    codeSerieMere: 'Z20500-5C',
    typeSerie: 'Variante',
    nomTechniqueComplet: 'Z 20500 \\ 5 caisses \\ NON RENFORCEE FREINAGE',
  },
  {
    identifiantSiSerie: 2088,
    codeLcn: 'Z2N',
    codeSerieMateriel: 'Z5600--4C--NRF',
    codeSerieMere: 'Z5600--4C',
    typeSerie: 'Variante',
    nomTechniqueComplet: 'Z 5600 \\ 4 caisses \\ NON RENFORCEE FREINAGE',
  },
  {
    identifiantSiSerie: 1626,
    codeLcn: 'PHZ',
    codeSerieMateriel: 'Z5550--L110',
    codeSerieMere: 'Z5550',
    typeSerie: 'Sous-Série',
    nomTechniqueComplet: 'Z 55500 \\ Longue (110 m)',
  },
  {
    identifiantSiSerie: 1627,
    codeLcn: 'PHZ',
    codeSerieMateriel: 'Z5550--L110GC',
    codeSerieMere: 'Z5550--L110',
    typeSerie: 'Variante',
    nomTechniqueComplet: 'Z 55500 \\ Longue (110 m) \\ Grande capacite',
  },
  {
    identifiantSiSerie: 1629,
    codeLcn: 'PHZ',
    codeSerieMateriel: 'Z5550--C081',
    codeSerieMere: 'Z5550',
    typeSerie: 'Sous-Série',
    nomTechniqueComplet: 'Z 55500 \\ Courte (81 m)',
  },
  {
    identifiantSiSerie: 1625,
    codeLcn: 'PHZ',
    codeSerieMateriel: 'Z5550',
    codeSerieMere: null,
    typeSerie: 'Série',
    nomTechniqueComplet: 'Z 55500',
  },
  {
    identifiantSiSerie: 1631,
    codeLcn: 'PHZ',
    codeSerieMateriel: 'Z5550--2UFR',
    codeSerieMere: 'Z5550',
    typeSerie: 'Sous-Série',
    nomTechniqueComplet: 'Z 55500 \\ Moyenne (95 m) double UFR',
  },
  {
    identifiantSiSerie: 2514,
    codeLcn: 'PHZ',
    codeSerieMateriel: 'Z56600',
    codeSerieMere: null,
    typeSerie: 'Série',
    nomTechniqueComplet: 'Z 56600',
  },
  {
    identifiantSiSerie: 495,
    codeLcn: 'Z2N',
    codeSerieMateriel: 'Z20900',
    codeSerieMere: null,
    typeSerie: 'Série',
    nomTechniqueComplet: 'Z 20900',
  },
  {
    identifiantSiSerie: 465,
    codeLcn: 'Z2N',
    codeSerieMateriel: 'Z8800',
    codeSerieMere: null,
    typeSerie: 'Série',
    nomTechniqueComplet: 'Z 8800',
  },
  {
    identifiantSiSerie: 1678,
    codeLcn: 'Z2N',
    codeSerieMateriel: 'Z20500-4C--RF',
    codeSerieMere: 'Z20500-4C',
    typeSerie: 'Variante',
    nomTechniqueComplet: 'Z 20500 \\ 4 caisses \\ RENFORCEE FREINAGE',
  },
  {
    identifiantSiSerie: 1875,
    codeLcn: 'Z2N',
    codeSerieMateriel: 'Z20500-4C--NRF',
    codeSerieMere: 'Z20500-4C',
    typeSerie: 'Variante',
    nomTechniqueComplet: 'Z 20500 \\ 4 caisses \\ NON RENFORCEE FREINAGE',
  },
  {
    identifiantSiSerie: 500,
    codeLcn: '2NG',
    codeSerieMateriel: 'Z26500',
    codeSerieMere: null,
    typeSerie: 'Série',
    nomTechniqueComplet: 'Z 26500',
  },
  {
    identifiantSiSerie: 2089,
    codeLcn: 'Z2N',
    codeSerieMateriel: 'Z5600--4C--RF',
    codeSerieMere: 'Z5600--4C',
    typeSerie: 'Variante',
    nomTechniqueComplet: 'Z 5600 \\ 4 caisses \\ RENFORCEE FREINAGE',
  },
  {
    identifiantSiSerie: 1670,
    codeLcn: 'PHZ',
    codeSerieMateriel: 'Z5550--C083GC',
    codeSerieMere: 'Z5550--C083',
    typeSerie: 'Variante',
    nomTechniqueComplet: 'Z 55500 \\ Courte (83 m) \\ Grande capacite',
  },
  {
    identifiantSiSerie: 1674,
    codeLcn: 'Z2N',
    codeSerieMateriel: 'Z5600--6C',
    codeSerieMere: 'Z5600',
    typeSerie: 'Sous-Série',
    nomTechniqueComplet: 'Z 5600 \\ 6 caisses',
  },
  {
    identifiantSiSerie: 1628,
    codeLcn: 'PHZ',
    codeSerieMateriel: 'Z5550--L110N110',
    codeSerieMere: 'Z5550--L110',
    typeSerie: 'Variante',
    nomTechniqueComplet: 'Z 55500 \\ Longue (110 m) \\ Normale',
  },
  {
    identifiantSiSerie: 497,
    codeLcn: 'MI2',
    codeSerieMateriel: 'Z22500',
    codeSerieMere: null,
    typeSerie: 'Série',
    nomTechniqueComplet: 'Z 22500',
  },
  {
    identifiantSiSerie: 506,
    codeLcn: 'Z50',
    codeSerieMateriel: 'Z50000',
    codeSerieMere: null,
    typeSerie: 'Série',
    nomTechniqueComplet: 'Z 50000',
  },
  {
    identifiantSiSerie: 479,
    codeLcn: 'Z2N',
    codeSerieMateriel: 'Z20500',
    codeSerieMere: null,
    typeSerie: 'Série',
    nomTechniqueComplet: 'Z 20500',
  },
  {
    identifiantSiSerie: 2588,
    codeLcn: 'NG2',
    codeSerieMateriel: 'Z58000-857C',
    codeSerieMere: 'Z58000',
    typeSerie: 'Sous-Série',
    nomTechniqueComplet: 'Z 58000 \\ Z 58500 - 7 caisses',
  },
  {
    identifiantSiSerie: 501,
    codeLcn: '2NG',
    codeSerieMateriel: 'Z26500-4C',
    codeSerieMere: 'Z26500',
    typeSerie: 'Sous-Série',
    nomTechniqueComplet: 'Z 26500 \\ 4 caisses',
  },
  {
    identifiantSiSerie: 1630,
    codeLcn: 'PHZ',
    codeSerieMateriel: 'Z5550--C083',
    codeSerieMere: 'Z5550',
    typeSerie: 'Sous-Série',
    nomTechniqueComplet: 'Z 55500 \\ Courte (83 m)',
  },
  {
    identifiantSiSerie: 1671,
    codeLcn: 'PHZ',
    codeSerieMateriel: 'Z5550--C083N083',
    codeSerieMere: 'Z5550--C083',
    typeSerie: 'Variante',
    nomTechniqueComplet: 'Z 55500 \\ Courte (83 m) \\ Normale',
  },
  {
    identifiantSiSerie: 2585,
    codeLcn: 'NG2',
    codeSerieMateriel: 'Z58000',
    codeSerieMere: null,
    typeSerie: 'Série',
    nomTechniqueComplet: 'Z 58000',
  },
  {
    identifiantSiSerie: 2598,
    codeLcn: 'Z50',
    codeSerieMateriel: 'Z50000-8C--KVB',
    codeSerieMere: 'Z50000-8C',
    typeSerie: 'Variante',
    nomTechniqueComplet: 'Z 50000 \\ 8 caisses \\ KVB',
  },
  {
    identifiantSiSerie: 480,
    codeLcn: 'Z2N',
    codeSerieMateriel: 'Z20500-4C',
    codeSerieMere: 'Z20500',
    typeSerie: 'Sous-Série',
    nomTechniqueComplet: 'Z 20500 \\ 4 caisses',
  },
  {
    identifiantSiSerie: 1675,
    codeLcn: 'Z2N',
    codeSerieMateriel: 'Z5600--6C--HRF',
    codeSerieMere: 'Z5600--6C',
    typeSerie: 'Variante',
    nomTechniqueComplet: 'Z 5600 \\ 6 caisses \\ HYBRIDE RENFORCEE FREINAGE',
  },
  {
    identifiantSiSerie: 1878,
    codeLcn: 'Z2N',
    codeSerieMateriel: 'Z20500-5C--HNRF',
    codeSerieMere: 'Z20500-5C',
    typeSerie: 'Variante',
    nomTechniqueComplet: 'Z 20500 \\ 5 caisses \\ HYBRIDE NON RENFORCEE FREINAGE',
  },
  {
    identifiantSiSerie: 507,
    codeLcn: 'Z50',
    codeSerieMateriel: 'Z50000-7C',
    codeSerieMere: 'Z50000',
    typeSerie: 'Sous-Série',
    nomTechniqueComplet: 'Z 50000 \\ 7 caisses',
  },
  {
    identifiantSiSerie: 508,
    codeLcn: 'Z50',
    codeSerieMateriel: 'Z50000-8C',
    codeSerieMere: 'Z50000',
    typeSerie: 'Sous-Série',
    nomTechniqueComplet: 'Z 50000 \\ 8 caisses',
  },
  {
    identifiantSiSerie: 2512,
    codeLcn: 'PHZ',
    codeSerieMateriel: 'Z56500',
    codeSerieMere: null,
    typeSerie: 'Série',
    nomTechniqueComplet: 'Z 56500',
  },
  {
    identifiantSiSerie: 2311,
    codeLcn: 'PHZ',
    codeSerieMateriel: 'Z57000',
    codeSerieMere: null,
    typeSerie: 'Série',
    nomTechniqueComplet: 'Z 57000',
  },
  {
    identifiantSiSerie: 2586,
    codeLcn: 'NG2',
    codeSerieMateriel: 'Z58000-806C',
    codeSerieMere: 'Z58000',
    typeSerie: 'Sous-Série',
    nomTechniqueComplet: 'Z 58000 \\ Z 58000 - 6 caisses',
  },
  {
    identifiantSiSerie: 2599,
    codeLcn: 'Z50',
    codeSerieMateriel: 'Z50000-8C--STM',
    codeSerieMere: 'Z50000-8C',
    typeSerie: 'Variante',
    nomTechniqueComplet: 'Z 50000 \\ 8 caisses \\ STM',
  },
  {
    identifiantSiSerie: 1877,
    codeLcn: 'Z2N',
    codeSerieMateriel: 'Z20500-5C',
    codeSerieMere: 'Z20500',
    typeSerie: 'Sous-Série',
    nomTechniqueComplet: 'Z 20500 \\ 5 caisses',
  },
  {
    identifiantSiSerie: 2596,
    codeLcn: 'Z50',
    codeSerieMateriel: 'Z50000-7C--KVB',
    codeSerieMere: 'Z50000-7C',
    typeSerie: 'Variante',
    nomTechniqueComplet: 'Z 50000 \\ 7 caisses \\ KVB',
  },
  {
    identifiantSiSerie: 2597,
    codeLcn: 'Z50',
    codeSerieMateriel: 'Z50000-7C--STM',
    codeSerieMere: 'Z50000-7C',
    typeSerie: 'Variante',
    nomTechniqueComplet: 'Z 50000 \\ 7 caisses \\ STM',
  },
  {
    identifiantSiSerie: 1669,
    codeLcn: 'PHZ',
    codeSerieMateriel: 'Z5550--L135',
    codeSerieMere: 'Z5550',
    typeSerie: 'Sous-Série',
    nomTechniqueComplet: 'Z 55500 \\ Extra-Longue (135m)',
  },
];

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 12, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 13, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 14, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 15, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 16, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 17, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 18, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 19, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 20, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 21, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 22, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 23, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 24, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 25, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 26, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 27, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 28, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 29, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 30, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Pipe({
  name: 'seriesFilter',
  standalone: true,
  pure: true,
})
export class SeriesFilterPipe implements PipeTransform {
  public transform(serie: Serie, filter?: string) {
    const filterLow = filter?.toLocaleLowerCase();
    return this.filterSerie(serie, filterLow);
  }

  private filterSerie(serie: Serie, filter?: string) {
    return (
      !filter ||
      serie.codeLcn.toLocaleLowerCase() === filter ||
      serie.codeSerieMateriel.toLocaleLowerCase().includes(filter) ||
      serie.nomTechniqueComplet.toLocaleLowerCase().includes(filter)
    );
  }
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,

    MdlSelectFilterComponent,
    MdlSelectNoResultsDirective,
    MdlTableComponent,
    MdlZoomButtonComponent,

    SeriesFilterPipe,
  ],
})
export class HomeComponent {
  protected codeOutput: any;
  protected dataSource = new MatTableDataSource<PeriodicElement>();
  protected displayedColumns: ColumnDisplayInfo[] = [
    { name: 'name', canHide: false, visible: true },
    { name: 'position', canHide: false, visible: true },
    { name: 'weight', canHide: true, visible: true },
    { name: 'symbol', canHide: true, visible: true },
  ];
  protected loading = signal<boolean | null>(null);
  protected readonly series = SERIES;
  protected readonly seriesControl = new FormControl<string[]>([]);

  protected executeArbitraryCode(code: string) {
    this.codeOutput = parseFunction(code)?.call(undefined);
  }

  protected loadData() {
    this.loading.set(true);
    setTimeout(() => {
      this.dataSource.data = ELEMENT_DATA;
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
