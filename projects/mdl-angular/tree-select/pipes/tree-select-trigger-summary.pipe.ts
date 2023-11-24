import { Pipe, PipeTransform } from '@angular/core';
import { MdlTreeSelectDirective } from '../directives/tree-select.directive';
import { MdlTreeOption } from '../models/tree-option';

@Pipe({
  name: 'mdlTreeSelectSummary',
  standalone: true,
})
export class TreeSelectTriggerSummaryPipe implements PipeTransform {
  public transform(val: any, treeSelect: MdlTreeSelectDirective<any, any>) {
    if (!treeSelect.treeOptions) return null;
    const rootItems = treeSelect.treeOptions
      .map((opt) => opt.item)
      .filter((item) => item.level === 0);
    const triggerString: string[] = [];

    this.addOptions(treeSelect, triggerString, rootItems);

    return triggerString.join(', ');
  }

  private addOptions(
    treeSelect: MdlTreeSelectDirective<any, any>,
    triggerVals: string[],
    items: MdlTreeOption[]
  ) {
    if (items.length === 0) return;

    for (let item of items) {
      if (treeSelect.getCheckboxState(item.key)) {
        triggerVals.push(treeSelect.getValue(item.key));
        continue;
      }

      if (item.children) this.addOptions(treeSelect, triggerVals, item.children);
    }
  }
}
