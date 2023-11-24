import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, Injectable, Input, Renderer2, inject } from '@angular/core';

@Directive({ selector: '[appDarkMode]', exportAs: 'darkMode', standalone: true })
export class DarkModeDirective {
  private _enabled: boolean = false;
  private renderer = inject(Renderer2);

  constructor() {
    this.enabled = coerceBooleanProperty(localStorage.getItem('dark'));
  }

  public get enabled() {
    return this._enabled;
  }

  public set enabled(value: boolean) {
    this._enabled = value;
    localStorage.setItem('dark', `${this.enabled}`);

    this.renderer.addClass(document.body, value ? 'dark' : 'light');
    this.renderer.removeClass(document.body, value ? 'light' : 'dark');
  }
}
