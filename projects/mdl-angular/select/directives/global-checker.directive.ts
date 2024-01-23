import { Directive, OnDestroy, Optional } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatSelect } from '@angular/material/select';
import { MdlTreeSelectDirective } from 'mdl-angular/tree-select';
import { Subject, debounceTime, takeUntil } from 'rxjs';

@Directive({
  standalone: true,
  selector: '[mdlSelectGlobalCheckbox]',
})
export class MdlSelectGlobalCheckboxDirective implements OnDestroy {
  private _destroy = new Subject<void>();
  private nbSelected: number = 0;

  constructor(
    private select: MatSelect,
    private checkbox: MatCheckbox,
    @Optional() private treeSelect: MdlTreeSelectDirective<any, any> | null
  ) {
    this.select._selectionModel.changed
      .pipe(takeUntil(this._destroy), debounceTime(50))
      .subscribe(() => {
        this.nbSelected = this.treeSelect
          ? this.treeSelect.treeOptions
              .filter((item) => !item.level)
              .map((item) => {
                const value = this.treeSelect?.getCheckboxState(item.option.value);
                return value === true ? 2 : value === null ? 1 : 0;
              })
              .reduce((cur: number, acc: number) => acc + cur, 0)
          : this.select._selectionModel.selected.length;
        this.checkbox.checked = this.nbSelected !== 0;
        this.checkbox.indeterminate =
          this.nbSelected > 0 &&
          this.nbSelected < this.select.options.length * (this.treeSelect ? 2 : 1);
      });

    this.checkbox.change.pipe(takeUntil(this._destroy)).subscribe((evt) => {
      if (!evt.checked) {
        this.select._selectionModel.clear(); // value = [];
      } else {
        const items =
          this.treeSelect?.treeOptions
            .filter((item) => !item.item.children)
            .map((item) => item.option) ?? this.select.options;
        this.select._selectionModel.select(...items);
      }

      //@ts-ignore
      this.select._propagateChanges();
    });
  }

  public ngOnDestroy(): void {
    this._destroy.complete();
  }
}
