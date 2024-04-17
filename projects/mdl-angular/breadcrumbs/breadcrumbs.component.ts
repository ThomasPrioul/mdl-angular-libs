import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, Input } from '@angular/core';
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
  @Input()
  public items?: NavItem<T>[];
  public itemTemplate: TemplateRef<T> | null = null;
}

export type NavItem<T> = {
  value: T;
  url: string;
};
