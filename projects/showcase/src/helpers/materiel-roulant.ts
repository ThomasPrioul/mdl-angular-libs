/** Compare deux séries par le champ {@link SerieEnginBase.codeSerieMateriel}.*/
export function compareSerieBase<T extends { codeSerieMateriel: string }>(a: T, b: T) {
  return a.codeSerieMateriel.localeCompare(b.codeSerieMateriel);
}

export function sortEngins<T extends { registration: string }>(a: T, b: T): number {
  return sortNumEfOrSerie(a.registration, b.registration);
}

/** Trie un numéro d'engin ou un code série matériel, gère les préfixes, suffixes en lettre et les noms type "TGVIRIS". */
export function sortNumEfOrSerie(a: string, b: string, descending?: boolean): number {
  // Impossible de réutiliser un objet RegExp contenant des groupes de capture nommés...
  const regexA = /(?<prefixA>[a-zA-Z])*(?<numA>\d+)(?<suffixA>(?:-*\w+)*)*/g;
  const regexB = /(?<prefixB>[a-zA-Z])*(?<numB>\d+)(?<suffixB>(?:-*\w+)*)*/g;
  const { prefixA, numA, suffixA } = regexA.exec(a)?.groups as {
    prefixA?: string;
    numA: string;
    suffixA?: string;
  };
  const { prefixB, numB, suffixB } = regexB.exec(b)?.groups as {
    prefixB?: string;
    numB: string;
    suffixB?: string;
  };

  // Comparer les engins sur la présence d'une lettre en préfixe
  // Les engins sans préfixe seront affichés en premier
  if (!prefixA && prefixB) return -1;
  else if (!prefixB && prefixA) return 1;

  const intA = parseInt(numA);
  const intB = parseInt(numB);

  // Si numéro identique, comparer la lettre en suffixe
  if (intA - intB === 0 && suffixA && suffixB) {
    return (suffixA as string).localeCompare(suffixB as string, undefined, {
      sensitivity: 'accent',
    });
  }

  return descending ? intB - intA : intA - intB;
}

export function sortCodeSerieMateriel(codeSerieA: string, codeSerieB: string) {
  try {
    // Impossible d'utiliser le même object RegExp 2 fois...
    const regexA = /(?<prefixA>[a-zA-Z])?(?<numA>\d+)?/g;
    const regexB = /(?<prefixB>[a-zA-Z])?(?<numB>\d+)?/g;
    const { prefixA, numA } = regexA.exec(codeSerieA)?.groups as {
      prefixA?: string;
      numA?: string;
    };
    const { prefixB, numB } = regexB.exec(codeSerieB)?.groups as {
      prefixB?: string;
      numB?: string;
    };

    // Comparer les séries sur la présence d'une lettre en préfixe
    // Les séries sans préfixe seront affichées en premier
    if (!prefixA && prefixB) return -1;
    else if (!prefixB && prefixA) return 1;

    if (
      numA &&
      numB &&
      ((prefixA && prefixB && prefixA.localeCompare(prefixB) === 0) || (!prefixA && !prefixB))
    ) {
      const intA = parseInt(numA);
      const intB = parseInt(numB);
      const compare = intA - intB;

      if (compare !== 0) return intA - intB;
    }
  } catch (error) {}
  return codeSerieA.localeCompare(codeSerieB);
}

export function sortNomTechniqueComplet(nomA: string, nomB: string) {
  try {
    // Impossible d'utiliser le même object RegExp 2 fois...
    const regexA = /^(?<prefixA>[a-zA-Z])?\s(?<numA>\d+)?/g;
    const regexB = /^(?<prefixB>[a-zA-Z])?\s(?<numB>\d+)?/g;
    const { prefixA, numA } = regexA.exec(nomA)?.groups as {
      prefixA?: string;
      numA?: string;
    };
    const { prefixB, numB } = regexB.exec(nomB)?.groups as {
      prefixB?: string;
      numB?: string;
    };

    // Comparer les séries sur la présence d'une lettre en préfixe
    // Les séries sans préfixe seront affichées en premier
    if (!prefixA && prefixB) return -1;
    else if (!prefixB && prefixA) return 1;

    if (
      numA &&
      numB &&
      ((prefixA && prefixB && prefixA.localeCompare(prefixB) === 0) || (!prefixA && !prefixB))
    ) {
      const intA = parseInt(numA);
      const intB = parseInt(numB);
      const compare = intA - intB;

      if (compare !== 0) return intA - intB;
    }
  } catch (error) {}
  return nomA.localeCompare(nomB);
}
