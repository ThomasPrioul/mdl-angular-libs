import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';

export interface TokenEntry {
  name: string;
  value: string;
  description: string;
  group: 'primary' | 'error' | 'neutral' | 'surface';
}

@Component({
  selector: 'app-theme-md3',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatDividerModule,
    MatBadgeModule,
  ],
  templateUrl: './theme-md3.component.html',
  styleUrl: './theme-md3.component.scss',
})
export class ThemeMd3Component {
  protected readonly tokens: TokenEntry[] = [
    { name: '--mat-sys-primary',             value: '#0088ce', description: 'Bleu SNCF',              group: 'primary' },
    { name: '--mat-sys-on-primary',          value: '#ffffff', description: 'Texte sur primary',       group: 'primary' },
    { name: '--mat-sys-primary-container',   value: '#e5f3fa', description: 'Container primaire',      group: 'primary' },
    { name: '--mat-sys-on-primary-container',value: '#001b3f', description: 'Texte sur container',     group: 'primary' },
    { name: '--mat-sys-error',               value: '#cd0037', description: 'Rouge SNCF',              group: 'error' },
    { name: '--mat-sys-on-error',            value: '#ffffff', description: 'Texte sur erreur',        group: 'error' },
    { name: '--mat-sys-error-container',     value: '#fae5eb', description: 'Container erreur',        group: 'error' },
    { name: '--mat-sys-surface',             value: '(palette)', description: 'Surface de fond',       group: 'surface' },
    { name: '--mat-sys-on-surface',          value: '(palette)', description: 'Texte sur surface',    group: 'surface' },
    { name: '--mat-sys-outline',             value: '(palette)', description: 'Bordures',              group: 'neutral' },
  ];

  protected readonly migrationCode = `// styles.scss — Migration MD2 → MD3
// 1. Remplacer l'import core (MD2) :
//   @import "mdl-angular/scss/material/core";
// 2. Par core-md3 :
@use "mdl-angular/scss/material/core-md3";

// Les fichiers de composants restent identiques :
@import "mdl-angular/scss/material/components/button";
@import "mdl-angular/scss/material/components/form-field";
// ...`;

  protected readonly themeDefinitionCode = `// theme-md3.scss (extrait)
@use "@angular/material" as mat;

$light-theme: mat.define-theme((
  color: (
    theme-type: light,
    primary: mat.$azure-palette,     // + overrides SNCF ci-dessous
  ),
  typography: (
    brand-family: 'Avenir, sans-serif',
    bold-weight: 800,
  ),
  density: (scale: 0),
));

// core-md3.scss applique ensuite :
@include mat.system-level-colors(
  theme.$light-theme,
  $overrides: (
    primary:           #0088ce,   // Bleu SNCF exact
    error:             #cd0037,   // Rouge SNCF exact
    primary-container: #e5f3fa,
    // ...
  )
);`;
}
