import { Directive, input, OnDestroy, Optional } from "@angular/core";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatSelect } from "@angular/material/select";

import { Subject, debounceTime, merge, takeUntil } from "rxjs";

import { MdlTreeSelectDirective } from "mdl-angular/tree-select";
import { toObservable } from '@angular/core/rxjs-interop';

@Directive({
  standalone: true,
  selector: '[mdlSelectGlobalCheckbox]',
})
export class MdlSelectGlobalCheckboxDirective implements OnDestroy {
  private _destroy = new Subject<void>();
  private nbSelected: number = 0;

  public withFilter= input<boolean>(false);

  constructor(
    private select: MatSelect,
    private checkbox: MatCheckbox,
    @Optional() private treeSelect: MdlTreeSelectDirective<any, any> | null
  ) {
    merge(toObservable(this.withFilter), this.select._selectionModel.changed)
      .pipe(takeUntil(this._destroy), debounceTime(50))
      .subscribe(() => {
        this.nbSelected = this.treeSelect
          ? this.treeSelect.treeOptions
            .filter((item) => !item.level && !item.option.disabled)
            .map((item) => {
              const value = this.treeSelect?.getCheckboxState(item.option.value);
              return value === true ? 2 : value === null ? 1 : 0;
            })
            .reduce((cur: number, acc: number) => acc + cur, 0)
          : this.select.options.filter(i => !i.disabled && i.selected).length;
        this.checkbox.checked = this.nbSelected !== 0;
        this.checkbox.indeterminate =
          this.nbSelected > 0 &&
          this.nbSelected < this.select.options.filter(opt => !opt.disabled).length * (this.treeSelect ? 2 : 1);
      });

    this.checkbox.change.pipe(takeUntil(this._destroy)).subscribe((evt) => {
      const items =
        this.treeSelect?.treeOptions
          .filter((item) => !item.item.children && (this.withFilter() ? !item.option.disabled : true))
          .map((item) => item.option) ?? this.select.options.filter(opt => !opt.disabled);

      if (!evt.checked) {
        this.select._selectionModel.deselect(...items)
        // this.select._selectionModel.clear(); // value = [];
      } else {
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
