export type Serie = {
  codeLcn: string;
  codeSerieMateriel: string;
  codeSerieMere: string | null;
  identifiantSiSerie: number;
  nomTechniqueComplet: string;
  typeSerie: 'Série' | 'Sous-Série' | 'Variante';
};
