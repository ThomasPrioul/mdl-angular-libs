import {
  Component,
  ComponentRef,
  Directive,
  ElementRef,
  HostBinding,
  inject,
  Input,
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
  private _mdlLoadingOverflow: 'hidden' | 'visible' | 'auto' = 'hidden';

  private componentRef?: ComponentRef<MdlLoadingWrapperComponent>;
  private elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private viewContainerRef = inject(ViewContainerRef);

  @HostBinding('style.position')
  public hostPosition: string = 'relative';
  @Input() public mdlLoading: boolean | undefined = false;
  @Input() public mdlLoadingText?: string;
  @Input() public mdlLoadingBackdrop?: boolean = true;

  @Input()
  public set mdlLoadingOverflow(value: 'hidden' | 'visible' | 'auto') {
    this._mdlLoadingOverflow = value;
  }

  public get mdlLoadingOverflow(): 'hidden' | 'visible' | 'auto' {
    return this._mdlLoadingOverflow;
  }

  public ngOnChanges(simpleChanges: SimpleChanges) {
    if (!Object.keys(simpleChanges).includes('mdlLoading')) return;

    if (this.mdlLoading && !this.componentRef) {
      this.componentRef = this.viewContainerRef.createComponent(MdlLoadingWrapperComponent);
      this.componentRef.instance.text = this.mdlLoadingText;
      this.componentRef.instance.backdrop = this.mdlLoadingBackdrop;
      this.elementRef.nativeElement.appendChild(this.componentRef.location.nativeElement);
    } else if (!this.mdlLoading && this.componentRef) {
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
  @Input() public text?: string;
  @HostBinding('class.backdrop')
  @Input()
  public backdrop?: boolean;
}
