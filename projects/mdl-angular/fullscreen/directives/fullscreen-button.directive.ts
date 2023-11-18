import { Directive, ElementRef, Input } from '@angular/core';
import { FullscreenService } from '../services/fullscreen.service';

@Directive({
  selector: '[mdlFullscreenButton]',
  standalone: true,
  exportAs: 'mdlFullscreenButton',
})
export class MdlFullscreenButtonDirective {
  private _fullscreenRoot: ElementRef | undefined;

  @Input('mdlFullscreenButton')
  public get fullscreenRoot(): ElementRef | undefined | '' {
    return this._fullscreenRoot;
  }
  public set fullscreenRoot(value: ElementRef | undefined | '') {
    if (value) this._fullscreenRoot = value;
  }

  constructor(el: ElementRef<HTMLElement>, private service: FullscreenService) {
    el.nativeElement.addEventListener('click', () => {
      if (this.service.isInFullScreen) {
        this.service.disableFullScreen();
      } else if (this.fullscreenRoot) {
        this.service.enableFullScreen(this.fullscreenRoot);
      } else {
        this.service.enableFullScreen(new ElementRef(document.getElementById('main')));
      }
    });
  }

  public get fullscreen() {
    return this.service.isInFullScreen;
  }
}
