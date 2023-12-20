import { FocusableOption } from '@angular/cdk/a11y';
import { Directive } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Directive({
  selector: 'mdl-date-preset',
  host: {
    tabindex: '-1',
    role: 'list-item',
  },
  standalone: true,
})
export class MdlDatePresetComponent implements FocusableOption {
  constructor(private button: MatButton) {}

  public get disabled(): boolean {
    return this.button.disabled;
  }

  public focus() {
    this.button.focus('keyboard');
  }

  public getLabel(): string {
    return this.button._elementRef.nativeElement.valueAsText;
  }
}
