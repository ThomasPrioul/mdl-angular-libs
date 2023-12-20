import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Table2DemoComponent } from '../components/table2-demo/table2-demo.component';
import { FormsDemoComponent } from '../components/forms-demo/forms-demo.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    // NG
    CommonModule,
    RouterLinkActive,
    RouterLink,
    RouterOutlet,

    // Material
    MatTabsModule,

    Table2DemoComponent,
    FormsDemoComponent,
  ],
})
export class HomeComponent {}
