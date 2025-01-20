import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { DarkModeService } from 'mdl-angular/dark';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatCardModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    OverlayModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private _fixedHeight!: boolean;
  private _menuOpen!: boolean;
  private _simpleMenu!: boolean;

  protected readonly darkMode = inject(DarkModeService);

  protected breakpoints = Breakpoints;
  protected breakpoints$ = inject(BreakpointObserver).observe([
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge,
  ]);
  protected popupOpen = false;

  public readonly hostElement = inject(ElementRef<HTMLElement>);

  @Output()
  public fixedHeightChange = new EventEmitter<boolean>();
  @Output()
  public menuOpenChange = new EventEmitter<boolean>();
  @Output()
  public simpleMenuChange = new EventEmitter<boolean>();

  @Input()
  public get fixedHeight(): boolean {
    return this._fixedHeight;
  }

  @Input()
  public get menuOpen(): boolean {
    return this._menuOpen;
  }

  @Input()
  public get simpleMenu(): boolean {
    return this._simpleMenu;
  }

  public set fixedHeight(value: boolean) {
    this._fixedHeight = value;
    this.fixedHeightChange.emit(value);
  }

  public set menuOpen(value: boolean) {
    this._menuOpen = value;
    this.menuOpenChange.emit(value);
  }

  public set simpleMenu(value: boolean) {
    this._simpleMenu = value;
    this.simpleMenuChange.emit(value);
  }
}
