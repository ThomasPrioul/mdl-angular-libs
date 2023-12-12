import { Pipe, PipeTransform } from '@angular/core';
import { SideMenu } from 'mdl-angular/side-menu-item';

function getFlattened(menu: SideMenu): SideMenu[] {
  var subMenus = (menu.children ?? []).flatMap(getFlattened);
  return [{ ...menu, children: undefined }, ...subMenus];
}

@Pipe({
  name: 'flatten',
  standalone: true,
})
export class FlattenMenusPipe implements PipeTransform {
  public transform(menus: SideMenu[]) {
    const newMenus = menus.flatMap(getFlattened);
    console.log(menus, newMenus);
    return newMenus;
  }
}
