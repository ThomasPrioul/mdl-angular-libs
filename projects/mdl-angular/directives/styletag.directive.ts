import { Directive, ElementRef, inject, Input, OnChanges, SimpleChanges } from "@angular/core";

/** Allows inserting a CSS block to an element.*/
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: "[mdlStyleTag]",
  standalone: true,
})
export class MdlStyleTagDirective implements OnChanges {
  private elementRef: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);

  @Input() public mdlStyleTag?: string;

  public ngOnChanges(simpleChanges: SimpleChanges) {
    const cssChanges = simpleChanges["mdlStyleTag"];
    if (!cssChanges) return;

    const oldStyle = this.elementRef.nativeElement.querySelector("style");
    if (oldStyle && !cssChanges.currentValue) {
      this.elementRef.nativeElement.removeChild(oldStyle);
    }

    if (cssChanges.currentValue) {
      if (oldStyle) {
        oldStyle.replaceChildren(document.createTextNode(cssChanges.currentValue));
      } else {
        const styleElement = document.createElement("style");
        styleElement.appendChild(document.createTextNode(cssChanges.currentValue));
        this.elementRef.nativeElement.appendChild(styleElement);
      }
    }
  }
}
