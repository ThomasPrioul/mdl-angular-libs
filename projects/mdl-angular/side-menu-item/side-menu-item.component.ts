import { NgClass, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLinkActive, RouterLink } from '@angular/router';

export interface SideMenu {
  children?: SideMenu[];
  clickable?: boolean;
  expanded?: boolean;
  icon?: string;
  link: string;
  ripple?: boolean;
  rippleColor?: string;
  slot?: string;
  style?: string;
  svgIcon?: string;
  text: string;
}

@Component({
  selector: 'mdl-side-menu-item',
  templateUrl: 'side-menu-item.component.html',
  styleUrls: ['side-menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgClass,
    NgStyle,
    RouterLink,
    RouterLinkActive,
    MatRippleModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class MdlSideMenuItemComponent {
  @ViewChild(RouterLinkActive) private readonly rla?: RouterLinkActive;

  @Input()
  public level: number = 0;
  @Input()
  public menu!: SideMenu;
  @Input()
  public simple: boolean = false;

  protected get expanded() {
    return this.menu.expanded || (this.rla && this.rla.isActive);
  }

  @HostBinding('class.simple') private get _simple() {
    return this.simple;
  }

  protected toggleItem(event: MouseEvent) {
    this.menu.expanded = !this.menu.expanded;
  }
}
