import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild,
  signal,
} from '@angular/core';
import { MatTabNav, MatTabsModule } from '@angular/material/tabs';
import { Table2DemoComponent } from '../../components/table2-demo/table2-demo.component';
import { FormsDemoComponent } from '../../components/forms-demo/forms-demo.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ScrollDispatcher, ScrollingModule } from '@angular/cdk/scrolling';
import { Subject, map, pairwise, startWith, takeUntil, tap } from 'rxjs';
import { ElementRefDirective } from 'mdl-angular';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    // NG
    RouterLinkActive,
    RouterLink,
    RouterOutlet,

    // Material
    MatTabsModule,
    ScrollingModule,

    // MDL
    ElementRefDirective,

    // App
    Table2DemoComponent,
    FormsDemoComponent,
  ],
})
export class HomeComponent implements OnDestroy {
  @ViewChild(MatTabNav, { static: true }) private readonly matTabNav!: MatTabNav;

  private readonly _destroy = new Subject<void>();

  protected fixedLayout = signal<boolean>(false);

  constructor(el: ElementRef<HTMLElement>, scroll: ScrollDispatcher, zone: NgZone) {
    scroll
      .scrolled()
      .pipe(
        takeUntil(this._destroy),
        map(() => window.scrollY),
        startWith(0),
        pairwise(),
        tap(([prev, current]) => {
          //@ts-ignore
          const headerHeight = this.matTabNav._elementRef.nativeElement.offsetHeight;
          // let headerHeight: string | number = getComputedStyle(el.nativeElement).getPropertyValue(
          //   '--header-height'
          // );
          // headerHeight = parseInt(headerHeight.substring(0, headerHeight.length - 2));
          if (this.fixedLayout() && current <= headerHeight)
            zone.run(() => this.fixedLayout.set(false));
          else if (current > headerHeight) zone.run(() => this.fixedLayout.set(prev > current));
        })
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this._destroy.complete();
  }
}
