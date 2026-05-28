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

### Étapes d'implémentation (dans l'ordre)

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

---

## 1. Upgrade Angular 20 → 21

**Ce qui a été fait :**
- `@angular/*`, `@angular/cdk`, `@angular/material` : `20.3.21` → `21.2.9` (devDependencies du workspace).
- `peerDependencies` de la lib publiée (`projects/mdl-angular/package.json`) : `>=19.2.9` → `>=20.0.0 <22.0.0` (= supporte Angular 20 ET 21, plus 19).
- La branche avait d'abord migré 19 → 20 + Vitest (commit `9804f9a`), puis 20 → 21 (commit `bdc54e1`).

**Pourquoi :** La branche `feat/md3-angular20-support` cible MD3 + Angular 20/21. Passer à 21 aligne la lib avec la dernière version stable et borne proprement la compatibilité côté consumers.

---

## 2. Thème Material Design 3 (SCSS)

**Nouveaux fichiers de theming MD3** (`projects/mdl-angular/scss/material/`) :
- `core-md3.scss` (~95 lignes) — base/core MD3 (tokens, typographie, densité).
- `theme-md3.scss` (~40 lignes) — définition du thème MD3 (palettes SNCF mappées sur les tokens MD3).
- `all-md3.scss` (~13 lignes) — point d'entrée agrégateur (équivalent MD3 du `all` MD2) pour les consumers.

**Overrides de composants mis à jour** (`scss/material/components/`) :
- `slide-toggle.scss` — refonte significative du style MD3 (+30 lignes).
- `chips.scss` — ajouts de règles MD3 (+20 lignes).
- `button.scss` — ajouts MD3 (+5 lignes), `tabs.scss` (+1), `form-field.scss` (+2 corrections mineures).
- `theme.scss` — restructuration (séparation MD2 / chargement conditionnel).

**Pourquoi :** Le thème MD3 est construit en parallèle du MD2 existant (les deux coexistent dans `dist/`, importés comme assets par les consumers, pas compilés dans la lib). Chaque composant Material nécessite des overrides spécifiques pour respecter les tokens MD3 et le look SNCF.

**Point d'attention :** Le SCSS MDL applique un `background-color` gris uniquement sur `mdc-text-field--outlined`. L'`appearance="fill"` donne le style Material brut (juste une ligne en bas) qui ne correspond PAS au style MDL. **Toujours utiliser `appearance="outline"` ou configurer `MAT_FORM_FIELD_DEFAULT_OPTIONS = { appearance: 'outline' }` dans les consumers.**

---

## 3. Migration vers les signals (inputs + queries)

**Ce qui a été fait :** Toute la surface publique de la lib est passée des décorateurs (`@Input`, `@Output`, `@ViewChild`, `@ContentChild(ren)`) aux équivalents signaux. Bilan actuel : **22 `input()`, 3 `output()`, 2 `contentChild()`, des `contentChildren()`, 1 `viewChild.required()`, 1 `model()`**.

Composants migrés (commits `76812f5` et `e95c38b`) :
- **ZoomButton, Breadcrumbs** — `@Input()` → `input()`.
- **Spinner** (`spinner.component.ts`) — refonte notable : suppression de la coercition CDK (`coerceBooleanProperty` / `coerceNumberProperty`) au profit de `input(…, { transform: booleanAttribute | numberAttribute })` ; `diameter`/`strokeWidth` effectifs via `computed()` ; host bindings déplacés dans le métadonnée `host: { … }` ; ajout de `ChangeDetectionStrategy.OnPush`. L'input `overlay` force `diameter=28` / `strokeWidth=9`.
- **SelectFilter** (`select-filter.component.ts`) — inputs + queries en signaux.
- **Table2** (`table2.component.ts`, ~170 lignes touchées) — `@ViewChild` → `viewChild()` (searchbar, paginator), `@ContentChild` → `contentChild()` (noDataRow, templates `paginatorAddons`/`buttonsAddons`), `@ContentChildren` → `contentChildren()` (`columnDefs`, `headerRowDefs`, `rowDefs`), `@Input()` → `input()`. Le `MatTable` reste en `@ViewChild(..., { static: true })` (query statique nécessaire tôt dans le cycle).

Directives migrées (dernières restantes, en `@Input()` décoratif) :
- `select/directives/clear-all-btn.directive.ts`
- `select/directives/select-all-btn.directive.ts`
- `spinner/directives/loading.directive.ts` (voir correction en section 7)

**Pourquoi :** Aligner la lib sur les API recommandées Angular 20/21 (réactivité fine, moins de boilerplate, meilleure interop OnPush).

**Gotcha clé rencontré :** `ngOnChanges` **ne se déclenche jamais pour les signal inputs**. Toute logique de réaction à un changement d'input doit passer par `effect()`, `computed()` ou `ngDoCheck` — pas `ngOnChanges`. C'est exactement le bug corrigé sur `loading.directive` (section 7).

---

## 4. `time-picker.component.ts` — animation inlinée

**Ce qui a été fait :** Remplacement de `import { matMenuAnimations } from '@angular/material/menu'` par un `trigger('transformMenu', …)` défini localement (open/close du menu : scale 0.8→1 + fade, courbes `120ms cubic-bezier(0,0,0.2,1)` / `100ms 25ms linear`).

**Pourquoi :** Angular Material 21 n'expose plus `matMenuAnimations`. L'animation a été ré-implémentée à l'identique dans le composant pour préserver le comportement.

**Point d'attention (pre-bundling Vite) :** La lib publiée génère désormais un output en compilation **complète** (`ɵɵdefineComponent`) et non partielle (`ɵɵngDeclareComponent`). Donc dans un consumer Vite, `mdl-angular/time-picker` **peut maintenant être pre-bundlé** normalement via un side-effect import dans `app.ts`. L'ancienne limitation (crash du linker Vite à cause du `trigger()` au niveau module) ne s'applique plus à l'output actuel de la dist.

---

## 5. Suite de tests (migration Vitest + ~132 specs)

**Ce qui a été fait :** La lib est passée de Karma/Jasmine à **Vitest** via le builder `@angular/build:unit-test` (commit `9804f9a`), puis la couverture a été étendue (commits `3efe891`, `2648b50`, `26dee53`). Infra ajoutée : `test-setup.ts` (import `zone.js`, stub `window.matchMedia` pour jsdom), `tsconfig.spec.json`, cible `test` dans `project.json`.

**~132 specs sur 11 fichiers :**

| Specs | Fichier | Couvre |
|------:|---------|--------|
| 26 | `table2.component.spec.ts` | sélection, filtre, rendu, `WithSelectionPipe` |
| 18 | `pipes.spec.ts` | pipes purs |
| 14 | `dark/dark-mode.service.spec.ts` | service dark mode (signals) |
| 12 | `select-filter.component.spec.ts` | filtre de select |
| 11 | `time-picker.component.spec.ts` | time-picker |
| 10 | `date-picker/utilities.spec.ts` | fonctions pures date |
| 10 | `spinner.component.spec.ts` | spinner |
| 10 | `zoom-button.component.spec.ts` | zoom button |
| 9 | `helpers.spec.ts` | helpers purs |
| 7 | `loading.directive.spec.ts` | overlay de chargement |
| 5 | `breadcrumbs.component.spec.ts` | breadcrumbs |

**Point d'attention (tests zoneless) :** voir section 7 — le builder exécute les specs en **zoneless**, ce qui change la façon de déclencher la détection de changements.

**Commande :** `npm run lib:test` (ou `npx nx test mdl-angular`).

---

## 6. Outillage et configuration

- `eslint.config.mjs` ajouté — config ESLint flat config (Angular ESLint).
- `.prettierignore` ajouté.
- `.gitignore` mis à jour (ignore `.angular/`, `__screenshots__/`, fichiers de config Claude).
- `nx.json` mis à jour.
- `autocomplete-stay-open.directive.ts` — correction TS2345 pour Angular 20 (typage autocomplete).

---

## 7. Showcase — améliorations

- `projects/showcase/src/environments/` créé avec `theme.ts` et `theme.md3.ts` — environnements séparés pour les deux builds (MD2 et MD3).
- Configuration de build `md3` ajoutée (commit `59b0b3e`) — la showcase peut être servie/buildée en MD2 ou MD3.
- `header` — toggle dark mode amélioré.
- Page `theme-md3` — HTML + SCSS retravaillés, fichier `theme-md3.styles.scss` séparé.
- `styles.scss` / `styles-md3.scss` restructurés (séparation MD2/MD3) ; `scss/base.scss` ajouts mineurs.

---

## 8. Fix `loading.directive` + gotcha tests zoneless

**Ce qui a été fait :** Réparation du test `loading.directive.spec.ts` (échec `NG0100` sur le 2ᵉ `detectChanges()`) ET de la directive elle-même.

**Bug de la directive :** la migration l'avait laissée avec des signal inputs (`input()`) pilotés par `ngOnChanges` → `ngOnChanges` ne se déclenchant pas pour les signal inputs, l'overlay ne se serait **jamais affiché** en runtime. Corrigé en gardant les signal inputs mais en pilotant création/destruction via `ngDoCheck` (qui tourne à chaque cycle quel que soit le type d'input). Validé au runtime sur `mdl-test-consumer` (page Spinner) via Playwright : overlay apparaît / disparaît / réapparaît.

**Cause racine du test — zoneless :** Le builder `@angular/build:unit-test` exécute les specs en mode **zoneless**. Le pattern `fixture.componentInstance.prop = x; fixture.detectChanges();` (écriture de propriété simple) **ne marque pas la vue hôte comme dirty**. Conséquence : la passe principale du 2ᵉ `detectChanges()` n'actualise pas le binding, mais le `checkNoChanges()` lancé par `tick()` en dev-mode (Angular 21) ré-évalue le template et lève `NG0100`.

**Fix du test :** `TestHostComponent` utilise désormais des `signal()` ; un `.set()` marque la vue dirty et déclenche correctement la détection en zoneless.

**À retenir (cross-projet) :** en tests zoneless Angular 21, ne pas muter une propriété de composant puis appeler `detectChanges()` — utiliser des signals, `fixture.componentRef.setInput()`, ou `markForCheck()`. Et `ngOnChanges` ne se déclenche pas pour les signal inputs.

**Résultat :** 132/132 specs lib OK, comportement runtime validé.
