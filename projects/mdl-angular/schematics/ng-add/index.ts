import {
  apply,
  chain,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
  addPackageJsonDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';

function installLibrary(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    // Add `mdl-angular` in package.json
    addPackageJsonDependency(tree, {
      type: NodeDependencyType.Default,
      name: 'mdl-angular',
      version: '^1.2.2', // Replace with reel version
    });

    // Execute `npm install`
    context.addTask(new NodePackageInstallTask());
    return tree;
  };
}

function installTailwind(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    // Ajouter les dépendances TailwindCSS, PostCSS et Autoprefixer dans les devDependencies
    addPackageJsonDependency(tree, {
      type: NodeDependencyType.Dev,
      name: 'tailwindcss',
      version: '^3.0.0', // Remplacer par la version réelle
    });

    addPackageJsonDependency(tree, {
      type: NodeDependencyType.Dev,
      name: 'postcss',
      version: '^8.0.0', // Remplacer par la version réelle
    });

    addPackageJsonDependency(tree, {
      type: NodeDependencyType.Dev,
      name: 'autoprefixer',
      version: '^10.0.0', // Remplacer par la version réelle
    });

    // Ajouter la tâche npm install pour installer les dépendances
    context.addTask(new NodePackageInstallTask());

    return tree;
  };
}

function addTailwindConfigFile(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const tailwindConfigFile = apply(url('./files/tailwind.config.txt'), [move('')]);
    _context.logger.info('Adding tailwind.config.txt to the root of the project.');

    // Si le fichier existe déjà, le remplacer
    if (tree.exists('tailwind.config.txt')) {
      tree.overwrite('tailwind.config.txt', tree.read('tailwind.config.txt')?.toString() || '');
    }

    return mergeWith(tailwindConfigFile)(tree, _context);
  };
}

function updateStyles(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const stylesPath = 'src/styles.scss';
    if (!tree.exists(stylesPath)) {
      throw new SchematicsException(`${stylesPath} not found`);
    }

    const stylesContent = tree.read(stylesPath)?.toString('utf-8');
    const mdlStyles = `
      @use "mdl-angular/scss" as mdl;
      @tailwind base;
      @tailwind components;
      @tailwind utilities;
      /* ... Votre CSS utilisant des variables MDL */

      /* Ajout des feuilles de styles MDL */
      @import "mdl-angular/scss/fonts";
      @import "mdl-angular/scss/material/core";
      @import "mdl-angular/scss/material/components/autocomplete";
      @import "mdl-angular/scss/material/components/badge";
      @import "mdl-angular/scss/material/components/button";
      @import "mdl-angular/scss/material/components/card";
      @import "mdl-angular/scss/material/components/chips";
      @import "mdl-angular/scss/material/components/checkbox";
      @import "mdl-angular/scss/material/components/dialog";
      @import "mdl-angular/scss/material/components/expansion";
      @import "mdl-angular/scss/material/components/table";
      @import "mdl-angular/scss/material/components/datepicker";
      @import "mdl-angular/scss/material/components/divider";
      @import "mdl-angular/scss/material/components/input";
      @import "mdl-angular/scss/material/components/menu";
      @import "mdl-angular/scss/material/components/option";
      @import "mdl-angular/scss/material/components/paginator";
      @import "mdl-angular/scss/material/components/progress-bar";
      @import "mdl-angular/scss/material/components/progress-spinner";
      @import "mdl-angular/scss/material/components/radio";
      @import "mdl-angular/scss/material/components/select";
      @import "mdl-angular/scss/material/components/slide-toggle";
      @import "mdl-angular/scss/material/components/slider";
      @import "mdl-angular/scss/material/components/sidenav";
      @import "mdl-angular/scss/material/components/sort";
      @import "mdl-angular/scss/material/components/tabs";
      @import "mdl-angular/scss/material/components/toolbar";
      @import "mdl-angular/scss/material/components/tooltip";
      @import "mdl-angular/scss/material/components/tree";
      @import "mdl-angular/scss/material/components/snack-bar";
      @import "mdl-angular/scss/material/components/form-field";
      @import "mdl-angular/scss/material/components/stepper";
      @import "mdl-angular/scss/colored-badge";
      @import "mdl-angular/scss/highlight";
      @import "mdl-angular/scss/panels";
      `;

    if (!stylesContent?.includes('@use "mdl-angular/scss"')) {
      tree.overwrite(stylesPath, stylesContent + mdlStyles);
    }
    return tree;
  };
}

function updateConfigOrMain(): Rule {
  return (tree: Tree) => {
    const configPath = 'src/app/app.config.ts'; // Chemin du fichier app.config.ts
    const mainPath = 'src/main.ts'; // Chemin du fichier main.ts

    const providersCode = `
        provideAnimations(),
        {
          provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
          useValue: {
            appearance: "outline",
            color: "primary",
            subscriptSizing: "dynamic",
            floatLabel: "always",
          },
        },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      `;

    const importsToAdd = [
      `import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from "@angular/material/form-field";`,
      `import { MAT_DIALOG_DATA } from "@angular/material/dialog";`,
      `import {provideAnimations} from '@angular/platform-browser/animations';`
    ];

    // Vérifie si app.config.ts existe
    if (tree.exists(configPath)) {
      const configContent = tree.read(configPath)?.toString('utf-8');
      if (!configContent) {
        throw new SchematicsException(`${configPath} is empty`);
      }

      // Ajoute les imports manquants dans app.config.ts
      let updatedConfig = configContent;
      for (const importStatement of importsToAdd) {
        if (!configContent.includes(importStatement)) {
          updatedConfig = `${importStatement}\n${updatedConfig}`;
        }
      }

      // Ajoute les nouveaux providers dans la configuration de appConfig
      const providersRegex = /providers:\s*\[([\s\S]*?)\]/;
      const match = providersRegex.exec(configContent);

      if (!match) {
        throw new SchematicsException(`No 'providers' array found in ${configPath}`);
      }

      const providersContent = match[1];
      if (!providersContent.includes('MAT_FORM_FIELD_DEFAULT_OPTIONS')) {
        updatedConfig = updatedConfig.replace(
          providersRegex,
          `providers: [${providersContent.trim()}, ${providersCode.trim()}]`,
        );
      }

      tree.overwrite(configPath, updatedConfig);
    } else if (tree.exists(mainPath)) {
      // Si app.config.ts n'existe pas, modifie main.ts
      const mainContent = tree.read(mainPath)?.toString('utf-8');
      if (!mainContent) {
        throw new SchematicsException(`${mainPath} is empty`);
      }

      // Ajoute les imports manquants dans main.ts
      let updatedMain = mainContent;
      for (const importStatement of importsToAdd) {
        if (!mainContent.includes(importStatement)) {
          updatedMain = `${importStatement}\n${updatedMain}`;
        }
      }

      // Vérifie si bootstrapApplication a déjà des providers
      const bootstrapRegex = /bootstrapApplication\(([\s\S]*?)\)/;
      const match = bootstrapRegex.exec(mainContent);

      if (!match) {
        throw new SchematicsException(
          `bootstrapApplication(AppComponent) not found in ${mainPath}`,
        );
      }

      const bootstrapArgs = match[1];
      let updatedBootstrap;

      if (bootstrapArgs.includes('providers')) {
        // Ajoute aux providers existants
        updatedBootstrap = bootstrapArgs.replace(
          /providers:\s*\[([\s\S]*?)\]/,
          (fullMatch, providersContent) => {
            if (providersContent.includes('MAT_FORM_FIELD_DEFAULT_OPTIONS')) {
              return fullMatch; // Ne rien faire si déjà existant
            }
            return `providers: [${providersContent.trim()}, ${providersCode.trim()}]`;
          },
        );
      } else {
        // Ajoute une nouvelle clé providers
        updatedBootstrap = `${bootstrapArgs.trim()}, {
          providers: [${providersCode.trim()}]
        }`;
      }

      updatedMain = mainContent.replace(
        bootstrapRegex,
        `bootstrapApplication(${updatedBootstrap})`,
      );
      tree.overwrite(mainPath, updatedMain);
    } else {
      throw new SchematicsException(`Neither ${configPath} nor ${mainPath} found`);
    }

    return tree;
  };
}

function updateAngularJson(): Rule {
  return (tree: Tree) => {
    const angularJsonPath = 'angular.json';

    if (!tree.exists(angularJsonPath)) {
      throw new SchematicsException(`File ${angularJsonPath} not found`);
    }

    const angularJsonContent = tree.read(angularJsonPath)?.toString('utf-8');
    if (!angularJsonContent) {
      throw new SchematicsException(`${angularJsonPath} is empty`);
    }

    const angularJson = JSON.parse(angularJsonContent);

    // Trouver dynamiquement le nom du projet dans angular.json
    const projectNames = Object.keys(angularJson.projects);
    if (projectNames.length !== 1) {
      throw new SchematicsException(
        `There should be exactly one project in ${angularJsonPath}, found: ${projectNames.length}`,
      );
    }

    const projectName = projectNames[0]; // Le nom du projet est le premier (ou le seul) dans la liste
    const project = angularJson.projects[projectName];

    // Accède à la section des assets du projet
    const assets = project?.architect?.build?.options?.assets;

    if (!assets) {
      throw new SchematicsException(`Assets array not found in ${angularJsonPath}`);
    }

    // Vérifie si l'entrée pour "*.svg" existe déjà
    const svgAsset = {
      glob: '*.svg',
      input: 'node_modules/mdl-angular/assets/',
      output: '/assets/',
    };

    const assetExists = assets.some((asset: any) => {
      return (
        asset.glob === svgAsset.glob &&
        asset.input === svgAsset.input &&
        asset.output === svgAsset.output
      );
    });

    if (!assetExists) {
      assets.push(svgAsset); // Ajoute l'élément si ce n'est pas déjà présent
    }

    // Écrit les modifications dans angular.json
    const updatedAngularJson = JSON.stringify(angularJson, null, 2); // Utilisation de JSON.stringify pour obtenir un format valide
    tree.overwrite(angularJsonPath, updatedAngularJson);

    return tree;
  };
}

function addLayoutFiles(): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    const layout = apply(url('./files/layout'), [move('src/app/components/layout')]);
    const core = apply(url('./files/core'), [move('src/app/core')]);
    return chain([mergeWith(layout), mergeWith(core)]);
  };
}

function updateAppComponent(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    // Remplacer le contenu de app.component.html
    const htmlPath = 'src/app/app.component.html';
    if (tree.exists(htmlPath)) {
      tree.overwrite(htmlPath, '<app-vertical-nav></app-vertical-nav>');
      context.logger.info(`Updated ${htmlPath} with <app-horizontal-nav></app-horizontal-nav>`);
    } else {
      context.logger.warn(`${htmlPath} not found.`);
    }

    // Ajouter l'import et mettre à jour @Component({ imports: [] })
    const tsPath = 'src/app/app.component.ts';
    if (tree.exists(tsPath)) {
      let tsContent = tree.read(tsPath)?.toString('utf-8');
      if (tsContent) {
        const importStatement = `import { VerticalNavComponent } from './components/layout/vertical-nav/vertical-nav.component';`;
        const componentDecoratorRegex = /@Component\(\{([\s\S]*?)\}\)/;
        const importsRegex = /imports:\s*\[([\s\S]*?)\]/;

        // Ajouter l'import en haut du fichier si manquant
        if (!tsContent.includes(importStatement)) {
          tsContent = `${importStatement}\n${tsContent}`;
          context.logger.info(`Added import for VerticalNavComponent in ${tsPath}`);
        }

        // Mettre à jour @Component({ imports: [] })
        const decoratorMatch = componentDecoratorRegex.exec(tsContent);
        if (decoratorMatch) {
          const decoratorContent = decoratorMatch[1];
          const importsMatch = importsRegex.exec(decoratorContent);

          if (importsMatch) {
            // Ajouter VerticalNavComponent à la liste existante
            const existingImports = importsMatch[1];
            if (!existingImports.includes('VerticalNavComponent')) {
              const updatedImports = `imports: [${existingImports.trim()}, VerticalNavComponent]`;
              tsContent = tsContent.replace(importsRegex, updatedImports);
              context.logger.info(`Updated imports array in @Component for ${tsPath}`);
            } else {
              context.logger.info(`VerticalNavComponent already exists in @Component imports for ${tsPath}`);
            }
          } else {
            // Ajouter une nouvelle clé imports: [] si absente
            const updatedDecorator = decoratorContent.replace(
              '{',
              `{\n  imports: [VerticalNavComponent],`
            );
            tsContent = tsContent.replace(componentDecoratorRegex, `@Component(${updatedDecorator})`);
            context.logger.info(`Added imports array to @Component in ${tsPath}`);
          }
        } else {
          context.logger.warn(`@Component decorator not found in ${tsPath}`);
        }

        // Écrire les modifications dans le fichier
        tree.overwrite(tsPath, tsContent);
      }
    } else {
      context.logger.warn(`${tsPath} not found.`);
    }

    return tree;
  };
}

export function ngAdd(): Rule {
  return chain([
    installLibrary(),
    installTailwind(),
    addTailwindConfigFile(),
    updateStyles(),
    updateConfigOrMain(),
    updateAngularJson(),
    addLayoutFiles(),
    updateAppComponent()
  ]);
}
