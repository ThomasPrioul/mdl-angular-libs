import { Rule, Tree, chain, SchematicContext, SchematicsException } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addPackageJsonDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';

function installLibrary(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    // Add `mdl-angular` in package.json
    addPackageJsonDependency(tree, {
      type: NodeDependencyType.Default,
      name: 'mdl-angular',
      version: '^1.2.2' // Replace with reel version
    });

    // Execute `npm install`
    context.addTask(new NodePackageInstallTask());
    return tree;
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
      /* ... Votre CSS utilisant des variables MDL */

      /* Ajout des feuilles de styles MDL */
      @import "mdl-angular/scss/fonts";
      @import "mdl-angular/scss/material/core";
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

function updateMainTs(): Rule {
  return (tree: Tree) => {
    const mainPath = 'src/main.ts';
    if (!tree.exists(mainPath)) {
      throw new SchematicsException(`${mainPath} not found`);
    }

    const mainContent = tree.read(mainPath)?.toString('utf-8');
    if (!mainContent) {
      throw new SchematicsException(`${mainPath} is empty`);
    }

    const providersCode = `
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
    ];

    // Add missing imports
    let updatedMain = mainContent;
    for (const importStatement of importsToAdd) {
      if (!mainContent.includes(importStatement)) {
        updatedMain = `${importStatement}\n${updatedMain}`;
      }
    }

    // Check if bootstrapApplication has already providers
    const bootstrapRegex = /bootstrapApplication\(([\s\S]*?)\)/;
    const match = bootstrapRegex.exec(mainContent);

    if (!match) {
      throw new SchematicsException(
        `bootstrapApplication(AppComponent) not found in ${mainPath}`
      );
    }

    const bootstrapArgs = match[1];
    let updatedBootstrap;

    if (bootstrapArgs.includes('providers')) {
      // Add to existing providers
      updatedBootstrap = bootstrapArgs.replace(
        /providers:\s*\[([\s\S]*?)\]/,
        (fullMatch, providersContent) => {
          if (providersContent.includes('MAT_FORM_FIELD_DEFAULT_OPTIONS')) {
            return fullMatch; // Do nothing if already exist
          }
          return `providers: [${providersContent.trim()}, ${providersCode.trim()}]`;
        }
      );
    } else {
      // Add new keys to providers
      updatedBootstrap = `${bootstrapArgs.trim()}, {
        providers: [${providersCode.trim()}]
      }`;
    }

    updatedMain = mainContent.replace(bootstrapRegex, `bootstrapApplication(${updatedBootstrap})`);
    tree.overwrite(mainPath, updatedMain);

    return tree;
  };
}

export function ngAdd(): Rule {
  return chain([installLibrary(), updateStyles(), updateMainTs()]);
}
