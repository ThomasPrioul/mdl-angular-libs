import { Directive, HostListener, Input } from '@angular/core';
import { MatSelect } from '@angular/material/select';

@Directive({
  standalone: true,
  selector: '[mdlSelectAll]',
})
export class MdlSelectAllDirective {
  constructor(private select: MatSelect) {}

  @HostListener('click') private onclick() {
    this.select._selectionModel.select(...this.select.options);
  }
}
