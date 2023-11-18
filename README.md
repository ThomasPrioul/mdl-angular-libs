# mdl-angular

Librairie de components Angular style SNCF / Maintenance Data Lab à utiliser en tant que sous-module git dans votre projet Angular + Material.

Vous y trouverez :

- Beaucoup de CSS, pour styliser une application "Material" au design guide SNCF.
- Une input "mdl-search-mr" avec autocomplétion pour rechercher des MR (à alimenter avec vos données applicatives)  
  ![Photo mdl-search-mr](./screenshots/mdl-search-mr.png)
- Une input "mdl-tree-select" pour afficher et sélectionner des données arrangées en arborescence (séries d'engin, stfs/flottes) à alimenter via une directive dans votre code applicatif (voir code MRveille pour exemple)  
  ![Photo mdl-tree-select](./screenshots/mdl-tree-select.png)
- Une input "mdl-date-range-input" pour sélectionner des plages de date avec raccourcis personnalisables.  
  ![Photo mdl-date-range-input](./screenshots/mdl-date-range-input.png)
- Un spinner (copié de wcs) avec une directive (mdlLoading) pour l'ajouter facilement à n'importe quel élément.
- Une table "mdl-table" stylisée design guide avec un support de templates de colonne en code ou ng-template, tri personnalisé, filtrage, pagination, lignes "expandable", sélection.  
  ![Photo mdl-table](./screenshots/mdl-table.png)

Cette librairie n'est pas un package npm, ce n'est qu'un ensemble de fichiers de code à importer dans votre projet via un sous-module git.
Elle est testée dans les projets MRveille (anciennement WebMaT) et SFMR avec les dépendances suivantes :

- @angular ^16.2.0
- @angular/material ^16.2.0

Il n'y a pas de dépendance sur les librairies wcs-core et wcs-angular.

Il est prévu de créer un package NPM pour simplifier la mise en place de la librairie.

## Mise en place

### Récupération des fichiers

Depuis votre dossier d'application existante :

```shell
cd <dossierAppli>
mkdir lib && cd lib
git submodule add https://gitlab-repo-mob.apps.eul.sncf.fr/dsit-mat/cds-spdc/05668/commun/mdl-angular.git mdl
```

Vous avez maintenant un dossier lib/mdl dans votre application.

⚠️ Attention, si vous avez un déploiement via Jenkins ou autre, faire attention à activer l'option "checkout submodules" lors de l'étape "checkout SCM" sous peine d'avoir des builds en échec pour fichiers manquants.

⚠️ Préciser dans le readme de votre projet de faire un clone avec sous-modules:
`git clone --recurse-submodules`

### Ajouter les styles MDL dans le fichier sass racine (styles.scss)

```scss
@use "/lib/mdl/scss/colors";
@use "/lib/mdl/scss/vars";
// ... Votre CSS utilisant des variables MDL
```

### Ajouter les styles pour chaque composant Material utilisé

Vous pouvez choisir à la carte la "surcouche" SNCF sur votre composant Material.
Pour cela il faut importer le fichier scss du composant en question. Si vous n'utilisez pas les styles SNCF, il faudra quand même importer les styles angular : `@include mat.<component>-theme($my-material-theme)`;
Quand vous utilisez un style SNCF, pas besoin de préimporter le style material, la librairie s'en charge avec la bonne configuration.
A ce jour, tous les styles ne sont pas encore migrés en mode MDL, et il n'y pas d'import en une seule ligne.

```scss
@import "/lib/mdl/scss/fonts";
@import "/lib/mdl/scss/material/core";
@import "/lib/mdl/scss/material/components/autocomplete";
@import "/lib/mdl/scss/material/components/badge";
@import "/lib/mdl/scss/material/components/button";
@import "/lib/mdl/scss/material/components/card";
@import "/lib/mdl/scss/material/components/checkbox";
@import "/lib/mdl/scss/material/components/dialog";
@import "/lib/mdl/scss/material/components/table";
@import "/lib/mdl/scss/material/components/datepicker";
@import "/lib/mdl/scss/material/components/divider";
@import "/lib/mdl/scss/material/components/input";
@import "/lib/mdl/scss/material/components/menu";
@import "/lib/mdl/scss/material/components/option";
@import "/lib/mdl/scss/material/components/paginator";
@import "/lib/mdl/scss/material/components/progress-bar";
@import "/lib/mdl/scss/material/components/progress-spinner";
@import "/lib/mdl/scss/material/components/radio";
@import "/lib/mdl/scss/material/components/select";
@import "/lib/mdl/scss/material/components/slide-toggle";
@import "/lib/mdl/scss/material/components/slider";
@import "/lib/mdl/scss/material/components/sidenav";
@import "/lib/mdl/scss/material/components/sort";
@import "/lib/mdl/scss/material/components/tabs";
@import "/lib/mdl/scss/material/components/toolbar";
@import "/lib/mdl/scss/material/components/tooltip";
@import "/lib/mdl/scss/material/components/tree";
@import "/lib/mdl/scss/material/components/snack-bar";
@import "/lib/mdl/scss/material/components/form-field";
// @import "/lib/mdl/scss/material/components/stepper";

// @use '../../bottom-sheet/bottom-sheet-theme';
// @use '../../chips/chips-theme';
// @use '../../expansion/expansion-theme';
// @use '../../grid-list/grid-list-theme';
// @use '../../list/list-theme';

@import "/lib/mdl/scss/colored-badge";
@import "/lib/mdl/scss/highlight";
@import "/lib/mdl/scss/panels";
```

### Polices

Pour utiliser la police Avenir, veillez à importer le fichier "/lib/mdl/scss/fonts" dans votre fichier de styles global, puis modifier la balise assets dans angular.json:

```json
"assets": [
  {
    "glob": "**/favicon.ico",
    "input": "src",
    "output": ""
  },
  {
    "glob": "**/*",
    "input": "src/assets",
    "output": "assets"
  },
  {
    "glob": "**/*",
    "input": "lib/mdl/assets",
    "output": "assets"
  }
],
```

### Configuration typescript de Material

La nouvelle style guide SNCF utilise des form fields entourés, plutôt qu'avec un fond grisé et une bordure basse.
MDL gère les deux mais il vaut mieux [configurer material en mode outline](https://material.angular.io/components/form-field/overview#form-field-appearance-variants).

Créer ou modifier un fichier contenant vos customizations Material:

```ts
// defaults.ts
export const MATERIAL_PROVIDERS = [
  {
    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    useValue: <MatFormFieldDefaultOptions>{
      appearance: "outline",
      color: "primary",
      subscriptSizing: "dynamic",
      floatLabel: "always",
    },
  },
];
```

Importez ce provider dans votre bootstrap module ou votre app.component standalone avec bootstrapApplication(); Cela forcera les form fields en mode "outline".

La librairie utilise également des icones SVG inline à ajouter à Material.

```ts
import { inlineSvgs } from "/lib/mdl/helpers/material-icons";

// Dans le constructeur d'un NgModule ou APP_INITIALIZER
const mat = inject(MatIconRegistry);

mat.addSvgIconLiteral(icon, dom.bypassSecurityTrustHtml(inlineSvgs.expand_more));

// Optionnel: icone MS teams pour le support
mat.addSvgIconLiteral(icon, dom.bypassSecurityTrustHtml(inlineSvgs.ms_teams));
```

### Dark/light mode

Le mode dark/light peut être activé de façon conditionnelle à un conteneur, cela peut être un div spécifique ou le body du HTML.

Pour bien gérer le dark mode au global, veillez à bien utiliser la classe mat-app-background dans votre fichier index.html :

```html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <base href="/" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
  </head>
  <body class="mat-app-background">
    <app-mrveille></app-mrveille>
  </body>
</html>
```

Vous pouvez par exemple faire un dark mode global en ajoutant une classe 'dark' à la balise body (hors périmètre de votre appli donc via la classe Renderer2):

```ts
// Fichier dark-mode.directive.ts dans votre projet
import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { Directive, Injectable, Input, Renderer2, inject } from "@angular/core";

@Directive({ selector: "[appDarkMode]", exportAs: "darkMode", standalone: true })
export class DarkModeDirective {
  private _enabled: boolean = false;
  private renderer = inject(Renderer2);

  constructor() {
    this.enabled = coerceBooleanProperty(localStorage.getItem("dark"));
  }

  public get enabled() {
    return this._enabled;
  }

  public set enabled(value: boolean) {
    this._enabled = value;
    localStorage.setItem("dark", `${this.enabled}`);
    value ? this.renderer.addClass(document.body, "dark") : this.renderer.removeClass(document.body, "dark");
  }
}
```

```html
<!-- Utilisation de la directive-->
<button appDarkMode #dark="darkMode" mat-menu-item (click)="dark.enabled = !dark.enabled">
  <mat-icon [innerText]="dark.enabled ? 'light_mode' : 'dark_mode'"></mat-icon>
  <span [innerText]="dark.enabled ? 'Mode clair' : 'Mode sombre'"></span>
</button>
```

### (Optionnel) Ajouter un chemin racine dans tsconfig.json pour les fichiers TypeScript de MDL

Ajoutez cet extrait dans tsconfig.json.

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "app/*": ["src/app/*"],
      "src/*": ["src/*"],
      "*": ["lib/*"]
    }
  }
}
```

Cet extrait vous permet d'utiliser des imports "courts" tels que :

```typescript
import { MyClass } from "app/my-class";
import { MdlSpinnerComponent } from "mdl";
```

### (Optionnel) Ajouter un chemin racine dans angular.json pour les fichiers sass

Dans projects.\<app\>.architect.build.options :

```json
"stylePreprocessorOptions": {
  "includePaths": ["lib", "src/app", "node_modules"]
}
```

Cet extrait vous permet d'utiliser des imports "courts" dans les fichier sass aussi.

## Utilisation

Les components sont "standalone". Vous devez donc les importer dans chacuns des components standalone dans lequel ils seront utilisés, ou alors dans le NgModule qui importe le composant utilisateur.
