import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {Directive, EventEmitter, inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject, Subscription, combineLatest, map } from 'rxjs';

@Directive({
  selector: '[appMainMenu]',
  standalone: true,
})
export class MainSideMenuDirective implements OnInit, OnDestroy {
  private readonly sidenav: MatSidenav = inject(MatSidenav);
  private readonly breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private _opened: boolean = false;
  private _simple: boolean = false;
  private sub?: Subscription;
  private simpleSubject = new BehaviorSubject<boolean>(false);

  protected readonly menuMode$ = combineLatest([
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
      .pipe(map((s) => (s.matches ? 'over' : 'side'))),
    this.simpleSubject,
  ]);

  @Output() public openedChange = new EventEmitter<boolean>();

  @Input()
  public get opened(): boolean {
    return this._opened;
  }

  @Input()
  public get simple(): boolean {
    return this._simple;
  }

  public set opened(value: boolean) {
    this._opened = value;
    this.sidenav.opened = value;
    this.openedChange.emit(value);
  }

  public set simple(value: boolean) {
    this._simple = value;
    this.sidenav.disableClose = value;
    this.simpleSubject.next(value);
  }

  public ngOnInit() {
    this.sidenav.mode = 'side';
    this.sub = this.menuMode$.subscribe(([mode, simple]) => {
      if (simple) this.opened = true;
      this.sidenav.mode = simple ? 'side' : mode;
    });
    this.sub.add(this.sidenav.closedStart.subscribe(() => (this.opened = false)));
  }

  public ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
