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

@Component({
  selector: 'app-showcase',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected menuOpen: boolean = false;
  protected menus: SideMenu[] = [
    {
      text: 'Accueil',
      link: '/home',
      children: [
        {
          text: 'Sous-feature 1/1',
          link: '/home/subfeature1',
        },
        {
          text: 'Sous-feature 1/2',
          link: '/home/subfeature2',
        },
      ],
    },
    {
      text: 'Paramètres',
      link: '/settings/',
    },
  ];

  public fixedHeight: boolean = true;
}
