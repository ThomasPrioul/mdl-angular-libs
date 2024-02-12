import { Directive, EventEmitter, Renderer2, inject, signal } from '@angular/core';
import { fromEvent, map, startWith } from 'rxjs';

type ThemeModes = 'auto' | 'light' | 'dark';

@Directive({ selector: '[appDarkMode]', exportAs: 'darkMode', standalone: true })
export class DarkModeDirective {
  private _enabled: ThemeModes = 'auto';
  private renderer = inject(Renderer2);
  private systemPrefersDark: boolean = false;

  public static readonly darkEnabled = signal<ThemeModes>('auto');

  public readonly systemPrefersDark$ = fromEvent<MediaQueryList>(darkModeMediaQuery, 'change').pipe(
    startWith(darkModeMediaQuery),
    map((list: MediaQueryList) => list.matches)
  );

  public enabledChange = new EventEmitter<ThemeModes>();

  constructor() {
    this.systemPrefersDark$.subscribe((val) => {
      this.systemPrefersDark = val;
      if (this._enabled === 'auto') {
        this.checkAuto();
      }
    });
    const darkStr = localStorage.getItem('dark');
    this.enabled = darkStr === null ? 'auto' : darkStr === 'light' ? 'light' : 'dark';
  }

  public get enabled() {
    return this._enabled;
  }

  public set enabled(value: 'auto' | 'light' | 'dark') {
    if (value === undefined) return;
    this._enabled = value;
    this.enabledChange.emit(value);
    DarkModeDirective.darkEnabled.set(value);

    this.checkAuto();
  }

  public get enabledSignal() {
    return DarkModeDirective.darkEnabled;
  }

  private checkAuto() {
    if (this._enabled === 'auto') {
      localStorage.removeItem('dark');
    } else {
      localStorage.setItem('dark', `${this._enabled}`);
    }

    const applyDark =
      this._enabled === 'dark' || (this._enabled === 'auto' && this.systemPrefersDark);
    this.renderer.addClass(document.body, applyDark ? 'dark' : 'light');
    this.renderer.removeClass(document.body, applyDark ? 'light' : 'dark');
  }
}

const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
