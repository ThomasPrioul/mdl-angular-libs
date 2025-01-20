import { NgClass, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MdlSideMenuItemComponent, SideMenu } from 'mdl-angular/side-menu-item';
import { MainSideMenuDirective } from '../../../directives/main-side-menu.directive';
import { RouterOutlet } from '@angular/router';
import { FlattenMenusPipe } from '../../../pipes/flatten-menus.pipe';
import packageJson from 'mdl-angular/package.json';
import { DarkModeService } from 'mdl-angular/dark';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-vertical-nav',
  templateUrl: './vertical-nav.component.html',
  styleUrls: ['./vertical-nav.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    // NG
    NgClass,
    NgStyle,
    RouterOutlet,
    // MAT
    MatSidenavModule,
    // MDL
    MdlSideMenuItemComponent,
    // APP
    MainSideMenuDirective,
    FlattenMenusPipe,
    HeaderComponent,
  ],
})
export class VerticalNavComponent {
  private readonly _dark = inject(DarkModeService);

  private appEnvIndex: number = 0;

  protected appEnv: string = appEnv[0];
  protected fixedHeight: boolean = true;
  protected menuOpen: boolean = true;
  protected menus: SideMenu[] = [
    {
      text: 'Accueil',
      link: '/home',
      icon: 'home',
      children: [
        {
          text: 'Exemple',
          link: '/home/example',
          icon: 'table_rows',
        },
      ],
    },
  ];
  protected simpleMenu: boolean = true;
  protected version = packageJson.version;

  protected changeEnv() {
    if (++this.appEnvIndex >= appEnv.length) this.appEnvIndex = 0;
    this.appEnv = appEnv[this.appEnvIndex];
  }
}

const appEnv = ['prod', 'rec', 'dev', 'local'];
