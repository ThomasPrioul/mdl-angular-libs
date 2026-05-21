import 'zone.js';
import 'zone.js/testing';

// jsdom does not implement matchMedia — define a minimal stub so Angular Material
// and DarkModeService can import without throwing at module-evaluation time.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string): MediaQueryList =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList,
});
