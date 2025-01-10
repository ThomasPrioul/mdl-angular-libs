import { Rule, SchematicContext, Tree, chain } from '@angular-devkit/schematics';

export function ngAdd(options: any): Rule {
  return chain([
    // Étape 1: Modifier app.component.html
    (tree: Tree, _context: SchematicContext) => {
      const appHtmlPath = 'src/app/app.component.html';
      if (tree.exists(appHtmlPath)) {
        tree.overwrite(appHtmlPath, `<h1>Welcome to My Custom Template!</h1>`);
      }
      return tree;
    },

    // Étape 2: Modifier app.component.ts
    (tree: Tree, _context: SchematicContext) => {
      const appTsPath = 'src/app/app.component.ts';
      if (tree.exists(appTsPath)) {
        const content = tree.read(appTsPath)?.toString('utf-8');
        if (content) {
          const updatedContent = content.replace(
            `title = 'app';`,
            `title = 'My Custom App';`
          );
          tree.overwrite(appTsPath, updatedContent);
        }
      }
      return tree;
    }
  ]);
}
