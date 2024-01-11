import { CommonModule } from '@angular/common';
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
import { DarkModeDirective } from '../../directives/dark-mode.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,

    DarkModeDirective,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private _fixedHeight!: boolean;
  private _menuOpen!: boolean;
  private _simpleMenu!: boolean;

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