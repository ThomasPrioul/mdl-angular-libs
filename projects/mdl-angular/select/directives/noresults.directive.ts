import {
  Directive,
  AfterViewInit,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
  Input,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { _getOptionScrollPosition } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MdlSelectFilterComponent } from '../components/select-filter/select-filter.component';

/** Affiche le template si aucun résultat n'existe dans le {@link MatSelect} après une recherche via un composant {@link MdlSelectFilterComponent}. */
@Directive({
  selector: '[mdlSelectNoResults]',
  exportAs: 'mdlSelectNoResults',
  standalone: true,
})
export class MdlSelectNoResultsDirective implements AfterViewInit, OnDestroy {
  private readonly callback: () => void;

  private hasView = false;
  private sub?: Subscription;

  @Input('mdlSelectNoResults')
  public filter?: MdlSelectFilterComponent;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private select: MatSelect,
  ) {
    this.callback = this.onFilterDown.bind(this);
  }

  public ngAfterViewInit() {
    if (!this.filter) throw new Error('Filter input must be set on mdlSelectNoResults directive');

    this.sub = new Subscription(() => {
      this.filter?.input.removeEventListener('keyup', this.callback);
      this.filter?.input.removeEventListener('focus', this.callback);
    });

    this.sub.add(
      this.select.openedChange.subscribe((opened) => {
        if (opened) {
          this.filter?.input.addEventListener('keyup', this.callback);
          this.filter?.input.addEventListener('focus', this.callback);
          this.callback();
        } else {
          this.filter?.input.removeEventListener('keyup', this.callback);
          this.filter?.input.removeEventListener('focus', this.callback);
        }
      }),
    );
  }

  public ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  private onFilterDown() {
    const visible =
      this.select.options.toArray().every((opt) => opt.disabled) &&
      (this.filter?.input?.value?.length ?? false);

    if (visible && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!visible && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
