import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Optional,
  output,
  input,
  viewChild,
} from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelect } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { MatOption, _getOptionScrollPosition } from '@angular/material/core';
import { ngClassToArray, skipDisabledOption } from 'mdl-angular';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MdlSelectGlobalCheckboxDirective } from '../../directives/global-checker.directive';

const cssClass = 'with-filter-host';
const verticalNavKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown'];

@Component({
  selector: 'mdl-select-filter',
  standalone: true,
  imports: [
    MatCheckboxModule,
    MdlSelectGlobalCheckboxDirective,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './select-filter.component.html',
  styleUrls: ['./select-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MdlSelectFilterComponent implements AfterViewInit, OnInit, OnDestroy {
  // ViewChild kept with decorator: static:true ensures availability in ngOnInit
  // (signal viewChild() resolves only after AfterViewInit)
  private readonly _inputRef = viewChild.required<ElementRef<HTMLInputElement>>('searchInput');
  private checkAllComponent = viewChild(MatCheckbox);

  private oldValue: string = '';
  private sub?: Subscription;

  placeholder = input<string>('Recherche');
  withCheckAll = input(false, { transform: booleanAttribute });
  onPaste = output<ClipboardEvent>();

  constructor(private ref: ElementRef<HTMLElement>, @Optional() private select?: MatSelect) {}

  public get input() {
    return this._inputRef().nativeElement;
  }

  public get offsetHeight() {
    return this.ref.nativeElement.offsetHeight;
  }

  public get value() {
    return this._inputRef().nativeElement.value;
  }

  public ngOnInit() {
    if (!this.select) return;

    // Material 16 fix - désactive la navigation sur les items désactivés (display:none en CSS)
    //@ts-ignore(2341)
    this.select._skipPredicate = skipDisabledOption;

    const defaultKeyDown = this.select._handleKeydown.bind(this.select);
    this.select._handleKeydown = (event) => {
      if (this.shouldInputHandleEvent(event as KeyboardEvent)) return;

      const previousActiveItem = this.select!._keyManager.activeItem;
      defaultKeyDown(event);

      this.handleFilterFocus(previousActiveItem, event as KeyboardEvent);

      const panel = this.select!.panel?.nativeElement as HTMLDivElement | undefined;
      if (!panel) return;

      const key = (event as KeyboardEvent).key;
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
        this._inputRef().nativeElement.value = this.oldValue;
      }
      defaultOpen();
      this.select?._keyManager.setActiveItem(null!);
    };

    this.sub = this.select._openedStream.subscribe((done) => {
      if (this.select?._keyManager.activeItemIndex === -1) this._inputRef().nativeElement.focus();
    });

    this.sub.add(this.select._closedStream.subscribe(() => {
      this._inputRef().nativeElement.value = '';
    }));
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
    this._inputRef().nativeElement.value = '';
    this._inputRef().nativeElement.focus();
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
          element.offsetTop - filterHeight - additionalPadding,
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
      this._inputRef().nativeElement.focus();
    } else if (this.withCheckAll() && newActiveItem === null && this.checkAllComponent()) {
      if (
        this._inputRef().nativeElement === document.activeElement &&
        !this._inputRef().nativeElement.selectionStart &&
        event.key === 'ArrowLeft'
      )
        this.checkAllComponent()!.focus();
      else if (
        this.checkAllComponent()?._inputElement.nativeElement === document.activeElement &&
        event.key === 'ArrowRight'
      ) {
        this._inputRef().nativeElement.focus();
        setTimeout(() => this._inputRef().nativeElement.setSelectionRange(0, 0));
      }
    }
  }

  private isSelectingAllText(event: KeyboardEvent) {
    return (
      event.key === 'a' &&
      event.ctrlKey &&
      document.activeElement === this._inputRef().nativeElement &&
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
