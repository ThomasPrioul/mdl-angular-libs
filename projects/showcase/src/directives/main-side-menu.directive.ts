import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Directive, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription, map } from 'rxjs';

@Directive({
  selector: '[appMainMenu]',
  standalone: true,
})
export class MainSideMenuDirective implements OnInit, OnDestroy {
  private _opened: boolean = false;
  private sub?: Subscription;

  protected readonly menuMode$ = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
    .pipe(map((s) => (s.matches ? 'over' : 'side')));

  @Output() public openedChange = new EventEmitter<boolean>();

  constructor(private sidenav: MatSidenav, private breakpointObserver: BreakpointObserver) {}

  @Input()
  public get opened(): boolean {
    return this._opened;
  }

  public set opened(value: boolean) {
    this._opened = value;
    this.sidenav.opened = value;
    this.openedChange.emit(value);
  }

  public ngOnInit() {
    this.sidenav.mode = 'side';
    this.sub = this.menuMode$.subscribe((mode) => (this.sidenav.mode = mode));
    this.sub.add(this.sidenav.closedStart.subscribe(() => (this.opened = false)));
  }

  public ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
