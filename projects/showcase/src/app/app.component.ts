import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MdlSideMenuItemComponent, SideMenu } from 'mdl-angular/side-menu-item';
import { MdlTableComponent } from 'mdl-angular/table2';
import { MdlZoomButtonComponent } from 'mdl-angular/zoom-button';
import { MainSideMenuDirective } from '../directives/main-side-menu.directive';
import { DarkModeDirective } from '../directives/dark-mode.directive';
import { RouterOutlet } from '@angular/router';
import { FlattenMenusPipe } from '../pipes/flatten-menus.pipe';

@Component({
  selector: 'app-showcase',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    // NG
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    // MAT
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatTooltipModule,
    // MDL
    MdlSideMenuItemComponent,
    MdlTableComponent,
    MdlZoomButtonComponent,
    // APP
    DarkModeDirective,
    MainSideMenuDirective,
    FlattenMenusPipe,
  ],
})
export class AppComponent {
  protected menuOpen: boolean = false;
  protected menus: SideMenu[] = [
    {
      text: 'Accueil',
      link: '/home',
      icon: 'home',
      children: [
        {
          text: 'Table2',
          link: '/home/table2',
          icon: 'table_rows',
        },
        {
          text: 'Forms',
          link: '/home/forms',
          icon: 'list',
        },
      ],
    },
    // {
    //   text: 'Paramètres',
    //   link: '/settings/',
    // },
  ];

  public fixedHeight: boolean = true;
  public simpleMenu: boolean = false;
}
