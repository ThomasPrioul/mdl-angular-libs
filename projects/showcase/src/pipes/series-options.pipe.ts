import { Pipe, PipeTransform } from '@angular/core';
import { Serie, TypeSerie } from '../models/serie';
import { MdlTreeOption } from 'mdl-angular/tree-select';
import { sortCodeSerieMateriel, sortNomTechniqueComplet } from '../helpers/materiel-roulant';

@Pipe({
  name: 'seriesOptions',
  standalone: true,
  pure: true,
})
export class SeriesOptionsPipe implements PipeTransform {
  public transform(series: Serie[], maxLevel: TypeSerie = 'Variante') {
    let options: MdlTreeOption<string, Serie>[] = [];
    this.addOptions(options, maxLevel, this.getChildren(undefined, series), series, undefined);

    const topLevelOptions = options.filter((opt) => opt.level === 0);
    if (topLevelOptions.length === 1) {
      options.splice(options.indexOf(topLevelOptions[0]), 1);
      options.forEach((opt) => {
        if (opt.level === 1) {
          opt.parent = undefined;
        }

        opt.level--;
      });
    }

    return options;
  }

  private addOptions(
    options: MdlTreeOption<string, Serie>[],
    maxLevel: TypeSerie,
    items: Serie[],
    series: Serie[],
    parentOption?: MdlTreeOption<string, Serie>
  ) {
    if (
      items.length === 0 ||
      (maxLevel === 'Série' && items[0].typeSerie !== 'Série') ||
      (maxLevel === 'Sous-Série' && items[0].typeSerie === 'Variante')
    ) {
      return;
    }

    for (let serie of items) {
      const option: MdlTreeOption<string, Serie> = {
        expanded: false,
        level: parentOption?.level !== undefined ? parentOption.level + 1 : 0,
        parent: parentOption,
        key: serie.codeSerieMateriel,
        value: serie,
      };
      options.push(option);
      if (parentOption) {
        if (!parentOption.children) parentOption.children = [];
        parentOption.children.push(option);
      }

      this.addOptions(options, maxLevel, this.getChildren(serie, series), series, option);
    }
  }

  private getChildren(serie: Serie | undefined, series: Serie[]) {
    const children = series
      .filter((s) => s.codeSerieMere === (serie?.codeSerieMateriel ?? null))
      .sort((a, b) => sortNomTechniqueComplet(a.nomTechniqueComplet, b.nomTechniqueComplet));
    return children;
  }
}

@Pipe({
  name: 'seriesOptionsFilter',
  standalone: true,
  pure: true,
})
export class SeriesOptionsFilterPipe implements PipeTransform {
  public transform(option: MdlTreeOption<string, Serie>, filter?: string) {
    const filterLow = filter?.toLocaleLowerCase();
    return this.filterOption(option, filterLow);
  }

  private filterOption(
    option: MdlTreeOption<string, Serie>,
    filter: string | undefined,
    checkChildren: boolean = true
  ): boolean {
    return (
      this.filterSerie(option.value, filter) ||
      (checkChildren &&
        option.children !== undefined &&
        option.children.some((c) => this.filterOption(c, filter))) ||
      (option.parent !== undefined && this.filterOption(option.parent, filter, false))
    );
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
