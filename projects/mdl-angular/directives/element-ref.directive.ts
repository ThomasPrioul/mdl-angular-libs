import { Directive, ElementRef } from '@angular/core';

/**
 * Export the ElementRef of the selected element for use with template references.
 *
 * @example
 * <button mat-button #button="elementRef" elementRef></button>
 */
@Directive({
  selector: '[elementRef]',
  exportAs: 'elementRef',
  standalone: true,
})
export class ElementRefDirective<T> extends ElementRef<T> {
  constructor(elementRef: ElementRef<T>) {
    super(elementRef.nativeElement);
  }
}
