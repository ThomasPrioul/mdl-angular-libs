import { Injectable, computed, effect, signal } from '@angular/core';
import { fromEvent, map, startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

export type ThemeModes = keyof typeof Themes;

@Injectable({ providedIn: 'root' })
export class DarkModeService {
  private systemPrefersDark = toSignal(systemPrefersDark$);

  protected toStorage = effect(() => {
    const theme = this.theme();

    if (theme === 'auto') {
      localStorage.removeItem('dark');
    } else {
      localStorage.setItem('dark', `${theme}`);
    }
  });

  public readonly applyDark = computed(() => {
    const theme = this.theme();
    return theme === 'dark' || (theme === 'auto' && this.systemPrefersDark());
  });
  public readonly classMutator = effect(() => {
    const applyDark = this.applyDark();
    document.body.classList.add(applyDark ? 'dark' : 'light');
    document.body.classList.remove(applyDark ? 'light' : 'dark');
  });
  public readonly theme = signal<ThemeModes>(this.getValueFromStorage());

  protected getValueFromStorage() {
    const darkStr = localStorage.getItem('dark');
    return !darkStr ? 'auto' : darkStr === 'light' ? 'light' : 'dark';
  }
}

export enum Themes {
  auto,
  light,
  dark,
}

export const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
export const systemPrefersDark$ = fromEvent<MediaQueryList>(darkModeMediaQuery, 'change').pipe(
  startWith(darkModeMediaQuery),
  map((list: MediaQueryList) => list.matches)
);
