import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mdl-empty-calendar-header',
  template: '',
  styles: [
    `
      :host {
        height: 64px;
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class EmptyCalendarHeaderComponent {}
