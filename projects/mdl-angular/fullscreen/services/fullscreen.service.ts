import { ElementRef, Injectable, OnDestroy } from '@angular/core';
import { Subscription, fromEvent, map, startWith, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FullscreenService implements OnDestroy {
  private _isInFullScreen: boolean = false;
  private sub?: Subscription;

  public isInFullScreen$ = fromEvent(document, 'fullscreenchange').pipe(
    map(() => document.fullscreenElement != null),
    startWith(false),
  );

  constructor() {
    this.sub = this.isInFullScreen$.pipe(tap((val) => (this._isInFullScreen = val))).subscribe();
  }

  public get isInFullScreen() {
    return this._isInFullScreen;
  }

  public ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  public async disableFullScreen() {
    if (!this.isInFullScreen) return;
    await document.exitFullscreen();
  }

  public async enableFullScreen(element: ElementRef | HTMLElement) {
    const elHtml = element instanceof ElementRef ? (element.nativeElement as HTMLElement) : element;
    try {
      await elHtml.requestFullscreen();
    } catch (err) {
      console.error(err);
    }
  }
}
