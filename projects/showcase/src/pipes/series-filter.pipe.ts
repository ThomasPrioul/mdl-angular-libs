import { Pipe, PipeTransform } from '@angular/core';
import { Serie } from '../models/serie';

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
