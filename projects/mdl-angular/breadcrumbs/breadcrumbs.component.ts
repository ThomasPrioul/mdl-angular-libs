import { ChangeDetectionStrategy, Component, input, TemplateRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'mdl-breadcrumbs',
  standalone: true,
  imports: [MatButtonModule, RouterLink, RouterLinkActive],
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MdlBreadcrumbsComponent<T> {
  items = input<NavItem<T>[] | undefined>(undefined);
  /** Template override for item rendering. Set via ViewChild or direct assignment. */
  public itemTemplate: TemplateRef<T> | null = null;
}

export type NavItem<T> = {
  value: T;
  url: string;
};
