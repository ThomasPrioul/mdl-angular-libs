import { defineConfig } from 'vitest/config';

// SCSS "style contract" tests. These compile the library's real SCSS with
// dart-sass (a node-only dependency) and assert the emitted Material design
// tokens — input heights, shapes, weights, etc. They cannot run under the
// Angular `@angular/build:unit-test` runner (browser-targeted, no node APIs),
// so they get their own node-environment Vitest project.
//
//   npm run test:styles
export default defineConfig({
  test: {
    name: 'styles',
    environment: 'node',
    include: ['tests/styles/**/*.spec.ts'],
  },
});
