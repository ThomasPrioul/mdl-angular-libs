import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { AfterViewInit, Directive, Input } from '@angular/core';
import {
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';

@Directive({
  selector: '[mdlAutocompleteStayOpen]',
  standalone: true,
})
export class MdlAutocompleteStayOpenDirective implements AfterViewInit {
  private _resizeOnOptionSelected: boolean = false;

  private defaultClose!: () => void;
  private defaultHandleKeyDown!: (event: KeyboardEvent) => void;
  private defaultResetActiveItem!: () => void;
  private defaultUpdatePanelState!: () => void;

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
      });
    }
  }
}
