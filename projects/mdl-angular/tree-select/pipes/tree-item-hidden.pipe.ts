import { Pipe, PipeTransform } from "@angular/core";
import { MdlTreeOption } from "../models/tree-option";

/** Retourne vrai si l'item doit être caché (parents pas expanded). */
@Pipe({
  name: "mdlTreeItemHidden",
  standalone: true,
  pure: false,
})
export class MdlTreeItemHiddenPipe implements PipeTransform {
  public transform(item: MdlTreeOption) {
    let parent = item.parent;
    while (parent !== undefined && parent.expanded) {
      parent = parent.parent;
    }
    return parent !== undefined;
  }
}
