import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from 'mdl-angular/i18n';

@Component({
  template: `<div>{{ 'Lib button works!' | translate }}</div>`,
  selector: 'mdl-button',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
})
export class ButtonComponent {}
