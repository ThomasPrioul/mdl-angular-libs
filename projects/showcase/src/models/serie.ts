import { DateTime } from 'luxon';

export type TypeSerie = 'Série' | 'Sous-Série' | 'Variante';

export type Serie = {
  codeLcn: string;
  codeSerieMateriel: string;
  codeSerieMere: string | null;
  dateCreation: DateTime;
  nomTechniqueComplet: string;
  typeSerie: TypeSerie;
};
