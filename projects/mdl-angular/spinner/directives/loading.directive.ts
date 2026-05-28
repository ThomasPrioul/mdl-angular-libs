import {
  Component,
  ComponentRef,
  Directive,
  DoCheck,
  ElementRef,
  HostBinding,
  inject,
  input,
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
export class MdlLoadingDirective implements DoCheck {
  // ngDoCheck (not ngOnChanges) drives the view sync: ngOnChanges never fires for
  // signal inputs, and ngDoCheck runs every change-detection cycle regardless.
  @HostBinding('style.overflow')
  protected _mdlLoadingOverflow: 'hidden' | 'visible' | 'auto' = 'hidden';

  private componentRef?: ComponentRef<MdlLoadingWrapperComponent>;
  private elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private viewContainerRef = inject(ViewContainerRef);
  private previousMdlLoading?: boolean;

  @HostBinding('style.position')
  public readonly hostPosition = 'relative';

  public mdlLoading = input<boolean | undefined>(false);
  public mdlLoadingText = input<string | undefined>(undefined);
  public mdlLoadingBackdrop = input<boolean | undefined>(true);
  public mdlLoadingOverflow = input<'hidden' | 'visible' | 'auto'>('hidden');

  ngDoCheck(): void {
    this._mdlLoadingOverflow = this.mdlLoadingOverflow();

    const loading = this.mdlLoading();
    if (loading === this.previousMdlLoading) return;
    this.previousMdlLoading = loading;

    if (loading) {
      if (!this.componentRef) {
        this.componentRef = this.viewContainerRef.createComponent(MdlLoadingWrapperComponent);
      }
      this.componentRef.instance.text = this.mdlLoadingText();
      this.componentRef.instance.backdrop = this.mdlLoadingBackdrop();
      this.elementRef.nativeElement.appendChild(this.componentRef.location.nativeElement);
    } else {
      this.componentRef?.destroy();
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
