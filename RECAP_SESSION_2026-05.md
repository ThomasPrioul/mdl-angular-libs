# Récap de session — `mdl-angular-libs`

Branche : `feat/md3-angular20-support`

---

## 0. Stratégie de versioning — À IMPLÉMENTER (en détail)

**Objectif :** maintenir deux lignes de version en parallèle pour ne PAS casser les projets existants (Angular 19 + MD2) tout en livrant MD3 + Angular 20/21 aux nouveaux projets.

| Ligne | Branche git | Angular | Material | peerDependencies | npm dist-tag | Usage |
|-------|-------------|---------|----------|------------------|--------------|-------|
| **v1.x** | `v1` (à créer depuis `main` actuel) | 19 | MD2 | `>=19.2.9 <20.0.0` | `@v1` | Projets existants — bugfixes uniquement |
| **v2.x** | `main` (← merge `feat/md3-angular20-support`) | 20/21 | MD3 | `>=20.0.0 <22.0.0` | `@latest` | Nouveaux projets / projets migrés |

**État actuel à vérifier avant release :**
- `main` : `mdl-angular@1.7.0`, peerDeps `>=19.2.9` (Angular 19 / MD2).
- `feat/md3-angular20-support` : version **encore à `1.7.0`** (À BUMPER → `2.0.0`), peerDeps déjà `>=20.0.0 <22.0.0` (Angular 20/21 / MD3).

### Étapes d'implémentation (dans l'ordre — par ThomasPrioul)

1. **Figer la v1** — créer la branche `v1` depuis le `main` ACTUEL, AVANT tout merge MD3 :
   ```bash
   git checkout main && git pull
   git checkout -b v1
   git push -u origin v1
   ```
   `v1` reste sur Angular 19 + MD2. Y verrouiller dans `projects/mdl-angular/package.json` :
   `version` en `1.x`, `peerDependencies` resserrées en `>=19.2.9 <20.0.0`.

2. **Basculer `main` en v2** — merger la feature branch puis bumper la majeure :
   ```bash
   git checkout main
   git merge feat/md3-angular20-support
   # projects/mdl-angular/package.json : version 1.7.0 → 2.0.0
   # (peerDeps déjà en >=20.0.0 <22.0.0)
   git commit -am "chore(release): v2.0.0 — Angular 20/21 + MD3"
   ```

3. **Publier la v2 (par défaut → dist-tag `@latest`) :**
   ```bash
   npm run lib:build
   npm publish dist/mdl-angular
   ```

4. **Publier / maintenir la v1 (dist-tag `@v1`, NE PAS écraser `@latest`) :**
   ```bash
   git checkout v1
   # bugfix éventuel + bump 1.x
   npm run lib:build
   npm publish dist/mdl-angular --tag v1
   ```

5. **Côté consumers :**
   - Projets Angular 19 existants : `npm i mdl-angular@v1` (ou pin `^1.7.0`).
   - Nouveaux projets Angular 20/21 : `npm i mdl-angular` (= `@latest` = 2.x).

**Maintenance ensuite :** bugfixes v1 → commits sur `v1`, publish `1.x` avec `--tag v1`. Features / MD3 → `main`, publish `2.x` en `@latest`.

> ⚠️ **Ne rien merger ni publier sans accord de ThomasPrioul** (propriétaire du repo).

---

## 1. Upgrade Angular 20 → 21

**Ce qui a été fait :** Tous les packages `@angular/*`, `@angular/cdk`, `@angular/material` ont été mis à jour de `20.3.21` vers `21.2.9`. Les `peerDependencies` de la lib publiée (`projects/mdl-angular/package.json`) ont été mises à jour de `>=19.2.9` vers `>=20.0.0 <22.0.0`, ce qui exprime clairement que la lib supporte Angular 20 et 21 mais pas 19.

**Pourquoi :** La branche `feat/md3-angular20-support` cible MD3 + Angular 20/21. Passer à 21 concrétise cet objectif et aligne la lib avec la dernière version stable.

---

## 2. Améliorations SCSS MD3

**Ce qui a été fait :** Plusieurs fichiers SCSS de composants ont été mis à jour :
- `button.scss` — ajouts de règles MD3
- `chips.scss` — ajouts de règles MD3
- `form-field.scss` — corrections mineures
- `slide-toggle.scss` — refonte significative du style MD3
- `tabs.scss` — ajustement mineur
- `theme.scss` — restructuration

**Pourquoi :** Le thème MD3 est en construction progressive sur cette branche. Chaque composant Material nécessite des overrides SCSS spécifiques pour respecter les tokens MD3 et le look SNCF.

**Point d'attention :** Le SCSS MDL applique un `background-color` gris uniquement sur `mdc-text-field--outlined`. L'`appearance="fill"` donne le style Material brut (juste une ligne en bas) qui ne correspond PAS au style MDL. **Toujours utiliser `appearance="outline"` ou configurer `MAT_FORM_FIELD_DEFAULT_OPTIONS = { appearance: 'outline' }` dans les consumers.**

---

## 3. Migrations signal inputs (directives restantes)

**Ce qui a été fait :** Trois directives ont été migrées vers les signal inputs/queries Angular :
- `select/directives/clear-all-btn.directive.ts`
- `select/directives/select-all-btn.directive.ts`
- `spinner/directives/loading.directive.ts`

**Pourquoi :** Les commits précédents sur la branche avaient déjà migré les composants principaux (ZoomButton, Spinner, Breadcrumbs, SelectFilter, Table2). Ces directives étaient les dernières utilisant encore le style `@Input()` décoratif.

**Correction (session suivante) :** La migration de `loading.directive.ts` était **buggée** : elle combinait des signal inputs (`input()`) avec `ngOnChanges`. Or **`ngOnChanges` ne se déclenche JAMAIS pour les signal inputs** (uniquement pour les `@Input()` décoratifs) → l'overlay de chargement ne se serait jamais affiché en runtime. Corrigé en gardant les signal inputs mais en pilotant la création/destruction de l'overlay via `ngDoCheck` (qui tourne à chaque cycle quel que soit le type d'input). Vérifié au runtime dans `mdl-test-consumer` (page Spinner) : l'overlay apparaît/disparaît/réapparaît correctement.

---

## 4. Corrections `table2.component.ts` et `time-picker.component.ts`

**Ce qui a été fait :** Corrections mineures sur les deux composants (voir diff pour le détail exact).

**Point d'attention (time-picker) :** La lib publiée génère un output en compilation **complète** (`ɵɵdefineComponent`) et non partielle (`ɵɵngDeclareComponent`). Cela signifie que dans un consumer Vite, `mdl-angular/time-picker` **peut maintenant être pre-bundlé** normalement via un side-effect import dans `app.ts`. L'ancienne limitation (crash du linker Vite à cause de `trigger()` au niveau module) ne s'applique plus à l'output actuel de la dist.

---

## 5. Outillage et configuration

**Ce qui a été fait :**
- `eslint.config.mjs` ajouté — configuration ESLint flat config (Angular ESLint)
- `.prettierignore` ajouté
- `.gitignore` mis à jour (ignore `.angular/` et `__screenshots__/`)
- `nx.json` mis à jour

---

## 6. Showcase — améliorations

**Ce qui a été fait :**
- `projects/showcase/src/environments/` créé avec `theme.ts` et `theme.md3.ts` — environnements séparés pour les deux builds (MD2 et MD3)
- `header` component mis à jour (toggle dark mode amélioré)
- `theme-md3` page : HTML + SCSS retravaillés, nouveau fichier `theme-md3.styles.scss` séparé
- `styles.scss` et `styles-md3.scss` restructurés pour une meilleure séparation MD2/MD3
- `scss/base.scss` : ajouts mineurs

---

## 7. Fix des specs `loading.directive` + gotcha tests zoneless

**Ce qui a été fait :** Réparation du test `loading.directive.spec.ts` (échec `NG0100` sur le 2ᵉ `detectChanges()`) et de la directive elle-même (cf. section 3).

**Cause racine — tests zoneless :** Le builder `@angular/build:unit-test` exécute les specs en mode **zoneless**. Le pattern `fixture.componentInstance.prop = x; fixture.detectChanges();` (écriture de propriété simple) **ne marque pas la vue hôte comme dirty**. Conséquence : la passe principale du 2ᵉ `detectChanges()` n'actualise pas le binding, mais le `checkNoChanges()` lancé par `tick()` en dev-mode (Angular 21) ré-évalue le template et lève `NG0100`.

**Fix du test :** `TestHostComponent` utilise désormais des `signal()` au lieu de propriétés simples ; un `.set()` marque la vue dirty et déclenche correctement la détection de changements en zoneless.

**À retenir (cross-projet) :** En tests zoneless Angular 21, ne pas muter une propriété de composant puis appeler `detectChanges()` — utiliser des signals, `fixture.componentRef.setInput()`, ou `markForCheck()`. Et `ngOnChanges` ne se déclenche pas pour les signal inputs.

**Résultat :** 132/132 specs lib OK, comportement runtime validé via Playwright sur `mdl-test-consumer`.
