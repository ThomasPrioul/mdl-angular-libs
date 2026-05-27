import {
  booleanAttribute,
  Component,
  ComponentRef,
  Directive,
  ElementRef,
  HostBinding,
  inject,
  input,
  OnChanges,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { MdlSpinnerComponent } from '../components/spinner.component';

/** Loading directive using a mdl-spinner absolutely positioned to the center of the targeted DOM element.*/
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[mdlLoading]',
  standalone: true,
  // @ts-ignore
  imports: [MdlSpinnerComponent],
})
export class MdlLoadingDirective implements OnChanges {
  @HostBinding('style.overflow')
  protected _mdlLoadingOverflow: 'hidden' | 'visible' | 'auto' = 'hidden';

  private componentRef?: ComponentRef<MdlLoadingWrapperComponent>;
  private elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private viewContainerRef = inject(ViewContainerRef);

  @HostBinding('style.position')
  public hostPosition: string = 'relative';

  mdlLoading = input<boolean | undefined>(false);
  mdlLoadingText = input<string | undefined>(undefined);
  mdlLoadingBackdrop = input<boolean | undefined>(true);
  mdlLoadingOverflow = input<'hidden' | 'visible' | 'auto'>('hidden');

  public ngOnChanges(simpleChanges: SimpleChanges) {
    if (!Object.keys(simpleChanges).includes('mdlLoading')) return;

    // Sync overflow from signal to HostBinding property
    this._mdlLoadingOverflow = this.mdlLoadingOverflow();

    if (this.mdlLoading() && !this.componentRef) {
      this.componentRef = this.viewContainerRef.createComponent(MdlLoadingWrapperComponent);
      this.componentRef.instance.text = this.mdlLoadingText();
      this.componentRef.instance.backdrop = this.mdlLoadingBackdrop();
      this.elementRef.nativeElement.appendChild(this.componentRef.location.nativeElement);
    } else if (!this.mdlLoading() && this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = undefined;
    }
  }
}

@Component({
  selector: 'mdl-loading-wrapper',
  standalone: true,
  imports: [MdlSpinnerComponent],
  template: `<mdl-spinner></mdl-spinner><span>{{ text }}</span>`,
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        z-index: 1;
        top: 0;
        color: #333;
        width: 100%;
        height: 100%;

        &.backdrop {
          background: #ffffff70;
        }
      }

      span {
        margin-left: 0.5rem;
      }
    `,
  ],
})
export class MdlLoadingWrapperComponent {
  @HostBinding('class.backdrop')
  public backdrop?: boolean;
  public text?: string;
}
