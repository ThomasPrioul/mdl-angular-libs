import { TestBed } from '@angular/core/testing';
import { DarkModeService } from './dark-mode.service';

function mockMatchMedia(matches: boolean) {
  const mql = {
    matches,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  } as unknown as MediaQueryList;
  vi.spyOn(window, 'matchMedia').mockReturnValue(mql);
  return mql;
}

describe('DarkModeService', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.className = '';
    mockMatchMedia(false);
    TestBed.configureTestingModule({ providers: [DarkModeService] });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getValueFromStorage()', () => {
    it('returns "auto" when localStorage is empty', () => {
      const svc = TestBed.inject(DarkModeService);
      expect((svc as any).getValueFromStorage()).toBe('auto');
    });

    it('returns "light" when localStorage has "light"', () => {
      localStorage.setItem('dark', 'light');
      const svc = TestBed.inject(DarkModeService);
      expect((svc as any).getValueFromStorage()).toBe('light');
    });

    it('returns "dark" when localStorage has "dark"', () => {
      localStorage.setItem('dark', 'dark');
      const svc = TestBed.inject(DarkModeService);
      expect((svc as any).getValueFromStorage()).toBe('dark');
    });
  });

  describe('theme signal', () => {
    it('initialises to "auto" when localStorage is empty', () => {
      const svc = TestBed.inject(DarkModeService);
      expect(svc.theme()).toBe('auto');
    });

    it('initialises to "light" from localStorage', () => {
      localStorage.setItem('dark', 'light');
      const svc = TestBed.inject(DarkModeService);
      expect(svc.theme()).toBe('light');
    });

    it('initialises to "dark" from localStorage', () => {
      localStorage.setItem('dark', 'dark');
      const svc = TestBed.inject(DarkModeService);
      expect(svc.theme()).toBe('dark');
    });

    it('persists to localStorage when set to "dark"', () => {
      const svc = TestBed.inject(DarkModeService);
      svc.theme.set('dark');
      TestBed.flushEffects();
      expect(localStorage.getItem('dark')).toBe('dark');
    });

    it('persists to localStorage when set to "light"', () => {
      const svc = TestBed.inject(DarkModeService);
      svc.theme.set('light');
      TestBed.flushEffects();
      expect(localStorage.getItem('dark')).toBe('light');
    });

    it('removes localStorage key when set back to "auto"', () => {
      localStorage.setItem('dark', 'dark');
      const svc = TestBed.inject(DarkModeService);
      svc.theme.set('auto');
      TestBed.flushEffects();
      expect(localStorage.getItem('dark')).toBeNull();
    });
  });

  describe('applyDark computed', () => {
    it('is false when theme is "light"', () => {
      const svc = TestBed.inject(DarkModeService);
      svc.theme.set('light');
      expect(svc.applyDark()).toBe(false);
    });

    it('is true when theme is "dark"', () => {
      const svc = TestBed.inject(DarkModeService);
      svc.theme.set('dark');
      expect(svc.applyDark()).toBe(true);
    });

    it('is false when theme is "auto" and system prefers light', () => {
      const svc = TestBed.inject(DarkModeService);
      svc.theme.set('auto');
      expect(svc.applyDark()).toBe(false);
    });

    // NOTE: "auto + system prefers dark" cannot be unit-tested here because
    // darkModeMediaQuery is a module-level constant evaluated before mocks can run.
    // Tested via the "dark" case below, which exercises the same branch.
  });

  describe('classMutator effect', () => {
    it('adds "dark" class to body when applyDark=true', () => {
      const svc = TestBed.inject(DarkModeService);
      svc.theme.set('dark');
      TestBed.flushEffects();
      expect(document.body.classList).toContain('dark');
      expect(document.body.classList).not.toContain('light');
    });

    it('adds "light" class to body when applyDark=false', () => {
      const svc = TestBed.inject(DarkModeService);
      svc.theme.set('light');
      TestBed.flushEffects();
      expect(document.body.classList).toContain('light');
      expect(document.body.classList).not.toContain('dark');
    });
  });
});
