import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelect } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { MatOption, _getOptionScrollPosition } from '@angular/material/core';
import { ngClassToArray, skipDisabledOption } from 'mdl-angular';

const cssClass = 'with-filter-host';
const verticalNavKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown'];

@Component({
  selector: 'mdl-select-filter',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './select-filter.component.html',
  styleUrls: ['./select-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MdlSelectFilterComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('searchInput', { static: true })
  private readonly _input!: ElementRef<HTMLInputElement>;

  private oldValue: string = '';
  private sub?: Subscription;

  @Input() public placeholder?: string = 'Recherche';

  constructor(private ref: ElementRef<HTMLElement>, @Optional() private select?: MatSelect) {}

  public get input() {
    return this._input.nativeElement;
  }

  public get offsetHeight() {
    return this.ref.nativeElement.offsetHeight;
  }

  public get value() {
    return this._input.nativeElement.value;
  }

  public ngOnInit() {
    if (!this.select) return;

    // Material 16 fix - désactive la navigation sur les items désactivés (display:none en CSS)
    //@ts-ignore(2341)
    this.select._skipPredicate = skipDisabledOption;

    // Surcharge du keydown pour gérer le décalage du scroll induit par la présence de l'input de filtrage.
    // Dans le cas du tree-select, ce handler est appelé AVANT celui du tree-select, le defaultKeyDown appelle donc la surcharge du tree-select!
    const defaultKeyDown = this.select._handleKeydown.bind(this.select);
    this.select._handleKeydown = (event) => {
      if (this.shouldInputHandleEvent(event)) return;

      const previousActiveItem = this.select!._keyManager.activeItem;
      defaultKeyDown(event);

      this.handleFilterFocus(previousActiveItem, event);

      // Attention sur ouverture du panneau le handler est appelé trop tôt, le panel n'est pas encore vraiment ouvert.
      const panel = this.select!.panel?.nativeElement as HTMLDivElement | undefined;
      if (!panel) return;

      // Correction du scroll dans le sens vertical en présence du filtre
      const key = event.key;
      this.fixScrollIfNeeded(panel, key);
    };

    const defaultClose = this.select.close.bind(this.select);
    this.select.close = () => {
      if (this.select?.panelOpen) {
        this.oldValue = this.value;
      }
      defaultClose();
    };

    const defaultOpen = this.select.open.bind(this.select);
    this.select.open = () => {
      if (!this.select?.panelOpen) {
        this.input.value = this.oldValue;
      }
      defaultOpen();
      this.select?._keyManager.setActiveItem(null!);
    };

    this.sub = this.select._panelDoneAnimatingStream.subscribe((done) => {
      // Pas géré dans select.close sinon crée un gros lag à cause d'un redraw
      if (done === 'void') {
        this.input.value = '';
      } else {
        if (this.select?._keyManager.activeItemIndex === -1) this.input.focus();
      }
    });
  }

  public ngAfterViewInit(): void {
    if (!this.select) return;
    let panelClass = ngClassToArray(this.select.panelClass);
    this.select.panelClass = [cssClass, ...panelClass];
  }

  public ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  protected onClearClick() {
    this._input.nativeElement.value = '';
    this._input.nativeElement.focus();
  }

  protected onFocus(event: FocusEvent) {
    this.select?._keyManager.setActiveItem(null!);
  }

  private fixScrollIfNeeded(panel: HTMLDivElement, key: string) {
    if (!verticalNavKeys.includes(key)) return;
    const last = this.select!._keyManager.activeItemIndex === this.select!.options.length - 1;
    const element = this.select!._keyManager.activeItem?._getHostElement();
    const filterHeight = this.offsetHeight;

    if (!element) return;

    let additionalPadding = parseFloat(
      getComputedStyle(this.ref.nativeElement).getPropertyValue('padding-top')
    );

    panel.scrollTop = last
      ? panel.scrollHeight
      : _getOptionScrollPosition(
          element.offsetTop - filterHeight - additionalPadding, // padding
          element.offsetHeight,
          panel.scrollTop,
          panel.offsetHeight
        );
  }

  private handleFilterFocus(previousActiveItem: MatOption<any> | null, event: KeyboardEvent) {
    const newActiveItem = this.select!._keyManager.activeItem;
    if (previousActiveItem === null && newActiveItem !== null) {
      this.select!.focus();
    } else if (
      previousActiveItem === newActiveItem &&
      newActiveItem?._getTabIndex() === '0' &&
      event.key === 'ArrowUp'
    ) {
      this.input.focus();
    }
  }

  private isSelectingAllText(event: KeyboardEvent) {
    return (
      event.key === 'a' &&
      event.ctrlKey &&
      document.activeElement === this.input &&
      this.value !== ''
    );
  }

  private isTabbingPrevious(event: KeyboardEvent) {
    return event.shiftKey && event.key !== 'Tab';
  }

  private shouldInputHandleEvent(event: KeyboardEvent) {
    return (
      event.ctrlKey ||
      event.altKey ||
      this.isTabbingPrevious(event) ||
      this.isSelectingAllText(event)
    );
  }
}
