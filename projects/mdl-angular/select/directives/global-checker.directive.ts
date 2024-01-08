import { Directive, OnDestroy } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatSelect } from '@angular/material/select';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  standalone: true,
  selector: '[mdlSelectGlobalCheckbox]',
})
export class MdlSelectGlobalCheckboxDirective implements OnDestroy {
  private _destroy = new Subject<void>();
  private nbSelected: number = 0;

  constructor(private select: MatSelect, private checkbox: MatCheckbox) {
    this.select.selectionChange.pipe(takeUntil(this._destroy)).subscribe(() => {
      this.nbSelected = this.select._selectionModel.selected.length;
      this.checkbox.checked = this.nbSelected !== 0;
      this.checkbox.indeterminate =
        this.nbSelected > 0 && this.nbSelected < this.select.options.length;
    });

    this.checkbox.change.pipe(takeUntil(this._destroy)).subscribe((evt) => {
      if (!evt.checked) {
        this.select._selectionModel.clear();
        return;
      }

      this.select._selectionModel.select(...this.select.options);
    });
  }

  public ngOnDestroy(): void {
    this._destroy.complete();
  }
}
