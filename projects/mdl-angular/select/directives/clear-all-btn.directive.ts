import { Directive, HostListener } from '@angular/core';
import { MatSelect } from '@angular/material/select';

@Directive({
  standalone: true,
  selector: '[mdlSelectClearAll]',
})
export class MdlSelectClearAllDirective {
  constructor(private select: MatSelect) {}

  @HostListener('click') protected onclick() {
    this.select._selectionModel.clear();
  }
}
