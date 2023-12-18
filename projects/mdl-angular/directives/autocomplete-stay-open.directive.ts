import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, Directive, Input, OnDestroy } from '@angular/core';
import {
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { _MatOptionBase, _getOptionScrollPosition } from '@angular/material/core';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[mdlAutocompleteStayOpen]',
  standalone: true,
})
export class MdlAutocompleteStayOpenDirective implements AfterViewInit, OnDestroy {
  private _resizeOnOptionSelected: boolean = false;
  private defaultClose!: () => void;
  private defaultHandleKeyDown!: (event: KeyboardEvent) => void;
  private defaultResetActiveItem!: () => void;
  private defaultUpdatePanelState!: () => void;
  private optionActivatedSub?: Subscription;

  constructor(private trigger: MatAutocompleteTrigger) {}
  public ngOnDestroy(): void {
    this.optionActivatedSub?.unsubscribe();
  }

  /** When used, will scroll the virtual scroll panel to copy "normal" behavior. */
  @Input() virtualScrollPanel?: CdkVirtualScrollViewport;

  /** Set this input if your text input with an autocomplete needs a resize when the selection changes. */
  @Input()
  public get resizeOnOptionSelected(): BooleanInput {
    return this._resizeOnOptionSelected;
  }

  public set resizeOnOptionSelected(value: BooleanInput) {
    this._resizeOnOptionSelected = coerceBooleanProperty(value);
  }

  /** Registers built-in autocomplete functionality into private variables, to later toggle some of them off for a specific moment. */
  public ngAfterViewInit(): void {
    //@ts-ignore(2341)
    this.defaultResetActiveItem = this.trigger._resetActiveItem;

    //@ts-ignore(2341)
    this.defaultUpdatePanelState = this.trigger._updatePanelState;

    this.defaultClose = this.trigger.closePanel;
    this.defaultHandleKeyDown = this.trigger._handleKeydown;

    // On keydown, disable resetActiveItem callback
    this.trigger._handleKeydown = (event) => {
      //@ts-ignore(2341)
      this.trigger._resetActiveItem = () => {};
      this.defaultHandleKeyDown.bind(this.trigger)(event);
    };

    if (this.virtualScrollPanel) {
      //@ts-ignore
      this.trigger.autocomplete._scrollToOption = function (index: number) {};
      this.trigger.autocomplete._keyManager.withWrap(false);

      this.optionActivatedSub = this.trigger.autocomplete.optionActivated.subscribe((event) => {
        if (!event.option) return;
        const index = parseInt(event.option._getHostElement().getAttribute('option-index')!);
        this._scrollToOption(index, event.option);
      });
    }
  }

  private _scrollToOption(scrollIndex: number, option: _MatOptionBase) {
    const autocomplete = this.trigger.autocomplete;
    if (scrollIndex === 0) {
      this.virtualScrollPanel!.scrollToOffset(0, 'instant');
    } else if (autocomplete.panel) {
      const element = option._getHostElement();
      const newScrollPosition = _getOptionScrollPosition(
        element.offsetTop,
        element.offsetHeight,
        this.virtualScrollPanel!.measureScrollOffset('top'),
        240
      );
      setTimeout(() => {
        this.virtualScrollPanel!.scrollToOffset(newScrollPosition, 'instant');
        this.virtualScrollPanel!.checkViewportSize();
      }, 30);
    }
  }

  /** Overrides default autocomplete behavior and resets it when the callback has "passed" */
  public itemSelected(event: MatAutocompleteSelectedEvent) {
    const autocomplete = event.source;
    autocomplete._keyManager.setActiveItem(event.option);

    this.trigger.closePanel = () => {
      //@ts-ignore(2341)
      this.trigger._closingActionsSubscription.unsubscribe();

      //@ts-ignore(2341)
      this.trigger._resetActiveItem = () => {};

      //@ts-ignore(2341)
      this.trigger._closingActionsSubscription = this.trigger._subscribeToClosingActions();
      //@ts-ignore(2341)
      this.trigger._updatePanelState = () => {
        Promise.resolve().then(() => {
          //@ts-ignore(2341)
          this.trigger._resetActiveItem = this.defaultResetActiveItem;

          //@ts-ignore(2341)
          this.trigger._updatePanelState = this.defaultUpdatePanelState;
        });
      };

      Promise.resolve().then(() => {
        this.trigger.closePanel = this.defaultClose;
      });
    };

    if (this.resizeOnOptionSelected) {
      setTimeout(() => {
        //@ts-ignore(2341)
        this.trigger._overlayRef.updateSize({ width: this.trigger._getPanelWidth() });
        this.virtualScrollPanel?.checkViewportSize();
      });
    }
  }

  public collectionChanged() {
    this.virtualScrollPanel?.scrollToOffset(0);
    this.virtualScrollPanel?.checkViewportSize();
    setTimeout(() => {
      this.trigger.autocomplete._keyManager.setFirstItemActive();
    });
  }
}
