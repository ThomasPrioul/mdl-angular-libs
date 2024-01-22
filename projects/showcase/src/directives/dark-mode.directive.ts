import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, Injectable, Input, Renderer2, inject, signal } from '@angular/core';

@Directive({ selector: '[appDarkMode]', exportAs: 'darkMode', standalone: true })
export class DarkModeDirective {
  private _enabled: boolean = false;
  private renderer = inject(Renderer2);

  public static readonly darkEnabled = signal<boolean>(false);

  constructor() {
    this.enabled = coerceBooleanProperty(localStorage.getItem('dark'));
  }

  public get enabledSignal() {
    return DarkModeDirective.darkEnabled;
  }

  public get enabled() {
    return this._enabled;
  }

  public set enabled(value: boolean) {
    this._enabled = value;
    localStorage.setItem('dark', `${this.enabled}`);
    DarkModeDirective.darkEnabled.set(value);

    this.renderer.addClass(document.body, value ? 'dark' : 'light');
    this.renderer.removeClass(document.body, value ? 'light' : 'dark');
  }
}
