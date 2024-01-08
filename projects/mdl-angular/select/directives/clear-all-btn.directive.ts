import { Directive, HostListener } from '@angular/core';
import { MatSelect } from '@angular/material/select';

@Directive({
  standalone: true,
  selector: '[mdlSelectClearAll]',
})
export class MdlSelectClearAllDirective {
  constructor(private select: MatSelect) {}

  @HostListener('click') private onclick() {
    this.select._selectionModel.clear();
  }
}
