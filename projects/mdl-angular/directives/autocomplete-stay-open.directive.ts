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
  exportAs: 'mdlAutocompleteStayOpen',
  standalone: true,
})
export class MdlAutocompleteStayOpenDirective implements AfterViewInit, OnDestroy {
  private _resizeOnOptionSelected: boolean = false;
  private defaultClose!: () => void;
  private defaultHandleKeyDown!: (event: KeyboardEvent) => void;
  private defaultResetActiveItem!: () => void;
  private defaultUpdatePanelState!: () => void;
  private skipOptionActivatedCallback = false;
  private sub = new Subscription();

  /** When used, will scroll the virtual scroll panel to copy "normal" behavior. */
  @Input() virtualScrollPanel?: CdkVirtualScrollViewport;

  constructor(private trigger: MatAutocompleteTrigger) {}

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
    //@ts-ignore(2341) ⚠️
    this.defaultResetActiveItem = this.trigger._resetActiveItem;

    //@ts-ignore(2341) ⚠️
    this.defaultUpdatePanelState = this.trigger._updatePanelState;

    this.defaultClose = this.trigger.closePanel;
    this.defaultHandleKeyDown = this.trigger._handleKeydown;

    // On keydown, disable resetActiveItem callback
    this.trigger._handleKeydown = (event) => {
      //@ts-ignore(2341) ⚠️
      this.trigger._resetActiveItem = () => {};
      this.defaultHandleKeyDown.bind(this.trigger)(event);
    };

    this.sub.add(
      this.trigger.autocomplete.optionSelected.subscribe((evt) => {
        this.skipOptionActivatedCallback = true;
        return this.itemSelected(evt);
      })
    );

    if (this.virtualScrollPanel) this.handleVirtualizedPanel(this.virtualScrollPanel);
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  /** Registers all handlers to replicate normal behavior (keyboard, scroll) when using a virtual scroll panel. */
  private handleVirtualizedPanel(virtualScrollPanel: CdkVirtualScrollViewport) {
    //@ts-ignore ⚠️
    this.trigger._scrollToOption = function (index: number) {};

    // Remove wrap behavior
    this.trigger.autocomplete._keyManager.withWrap(false);

    // Don't change active index when options QueryList changes, otherwise this will create an infinite scrolling reset loop
    this.sub.add(
      this.trigger.autocomplete.options.changes.subscribe(() => {
        this.skipOptionActivatedCallback = true;
      })
    );

    this.sub.add(
      this.trigger.autocomplete.optionActivated.subscribe((event) => {
        // Don't scroll when not desired
        if (this.skipOptionActivatedCallback) {
          this.skipOptionActivatedCallback = false;
          return;
        }

        if (event.option) this.scrollToOption(event.option);
      })
    );

    // ⚠️ Subscribe to internal cdkNgForOf data changed stream
    this.sub.add(
      (virtualScrollPanel.scrollable as any)._forOf.dataStream.subscribe(() => {
        if (this.trigger.autocomplete.isOpen) this.resetScroll();
      })
    );

    this.sub.add(this.trigger.autocomplete.opened.subscribe(() => this.resetScroll()));
  }

  /** Overrides default autocomplete behavior and resets it when the callback has "passed" */
  private itemSelected(event: MatAutocompleteSelectedEvent) {
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
        //@ts-ignore(2341) ⚠️
        this.trigger._overlayRef.updateSize({ width: this.trigger._getPanelWidth() });
        this.virtualScrollPanel?.checkViewportSize();
      });
    }
  }

  private resetScroll() {
    this.virtualScrollPanel?.scrollToOffset(0, 'instant');
    this.virtualScrollPanel?.checkViewportSize();
    setTimeout(() => {
      this.trigger.autocomplete._keyManager.setActiveItem(
        this.trigger.autocomplete.autoActiveFirstOption ? 0 : -1
      );
    }, 80);
  }

  private scrollToOption(option: _MatOptionBase<any>) {
    const element = option._getHostElement();
    // const newScrollPosition = _getOptionScrollPosition(
    //   element.offsetTop,
    //   element.offsetHeight,
    //   this.virtualScrollPanel!.measureScrollOffset(),
    //   this.virtualScrollPanel!.getViewportSize()
    // );
    // this.virtualScrollPanel!.scrollToOffset(newScrollPosition);
    element.scrollIntoView({ block: 'nearest', inline: 'start' });
  }
}
