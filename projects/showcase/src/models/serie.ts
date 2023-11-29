export type TypeSerie = 'Série' | 'Sous-Série' | 'Variante';

export type Serie = {
  codeLcn: string;
  codeSerieMateriel: string;
  codeSerieMere: string | null;
  nomTechniqueComplet: string;
  typeSerie: TypeSerie;
};
