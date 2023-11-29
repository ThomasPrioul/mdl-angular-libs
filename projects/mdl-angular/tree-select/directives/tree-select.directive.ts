import {
  Directive,
  QueryList,
  ContentChildren,
  OnInit,
  OnDestroy,
  AfterViewInit,
  inject,
  Input,
  AfterContentInit,
  forwardRef,
} from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { MatOption, _getOptionScrollPosition } from '@angular/material/core';
import { SelectionChange } from '@angular/cdk/collections';
import { ngClassToArray, skipDisabledOption } from 'mdl-angular';
import { MdlTreeOptionComponent } from '../components/tree-option/tree-option.component';
import { MdlTreeOption } from '../models/tree-option';

type SelectionModif<K> = {
  key: K;
  action: 'select' | 'deselect';
};

/** Ajoute la notion de 'tree' à un mat-select. */
@Directive({
  selector: '[mdlTreeSelect]',
  exportAs: 'mdlTreeSelect',
  standalone: true,
})
export class MdlTreeSelectDirective<K, T>
  implements OnInit, OnDestroy, AfterViewInit, AfterContentInit
{
  private ignoreSelectChange: boolean = false;
  private keyToMatOption!: Map<K, MatOption<K>>;
  private keyToTreeItemComponent!: Map<K, MdlTreeOptionComponent<K, T>>;
  private select = inject(MatSelect);
  private sub?: Subscription;

  @ContentChildren(forwardRef(() => MdlTreeOptionComponent<K, T>), { descendants: true })
  public treeOptions!: QueryList<MdlTreeOptionComponent<K, T>>;
  // * - first-level: renvoie uniquement le parent si tous ses enfants sont sélectionnés. Simplifie la liste selon la sélection active.
  // * - mixed: sélectionne le parent dès qu'un de ses enfants est sélectionné.
  /** Gestion des items sélectionnés
   * - last-level: ne renvoie que les items sélectionnés qui n'ont pas d'enfants (items de dernier niveau). Cocher une case de haut niveau peut renvoyer de nombreux éléments.
   * - none: le tree est purement esthétique, il n'y aura pas de gestion de la sélection.
   */
  @Input() public treeSelectionHandling: 'last-level' | 'none' = 'last-level';

  // | "first-level" | "mixed"
  protected get panelClass(): string[] {
    return ['tree', ...ngClassToArray(this.select.panelClass)];
  }

  public ngOnInit() {
    if (!this.select.multiple)
      throw new Error('mdlTreeSelect not supported on single selection trees');

    // Material 16 fix - désactive la navigation sur les items désactivés (display:none en CSS)
    (this.select as any)._skipPredicate = skipDisabledOption;

    /* Surcharge du keydown pour gérer :
     * - les flèches gauche/droite, peu importe la présence de la barre de filtre,
     * - le ctrl+A,
     * - le activeItem et focus de la barre de filtre si présente.
     */
    const defaultKeyDown = this.select._handleKeydown.bind(this.select);
    this.select._handleKeydown = (event) => {
      if (this.handleCtrlA(event)) {
        event.preventDefault();
        return;
      }
      this.handleExpandKeys(event.key);

      defaultKeyDown(event);
    };

    this.sub = this.select.openedChange.subscribe(this.onOpenedChange.bind(this));
  }

  public ngAfterContentInit(): void {
    this.keyToTreeItemComponent = new Map(this.treeOptions.map((i) => [i.item.key, i]));

    this.sub?.add(
      this.treeOptions.changes.subscribe(() => {
        this.keyToTreeItemComponent = new Map(this.treeOptions.map((i) => [i.item.key, i]));
      })
    );
  }

  public ngAfterViewInit() {
    this.select.panelClass = this.panelClass;

    this.onOptionsChanged(null);
    this.sub?.add(this.select.options.changes.subscribe(this.onOptionsChanged.bind(this)));
    this.sub?.add(
      this.select._selectionModel.changed.subscribe(this.onSelectionModelChanged.bind(this))
    );
    this.sub?.add(this.select.selectionChange.subscribe(() => this.refreshCheckStates()));
  }

  public ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  public getCheckboxState(key: K, considerChecked: boolean = true) {
    if (considerChecked && this.select._selectionModel.isSelected(this.keyToMatOption.get(key)!))
      return true;

    const treeItem = this.keyToTreeItemComponent.get(key)!.item;
    return this.itemDescendantsChecked(treeItem);
  }

  public getValue(key: K) {
    return this.keyToTreeItemComponent.get(key)!.option.viewValue;
  }

  public setActiveItem(option?: MatOption<K>) {
    this.select._keyManager.setActiveItem(option ?? null!);
  }

  protected onOpenedChange(opened: boolean) {
    if (!opened) return;
    this.refreshCheckStates();
  }

  private applyModifications(modifications: SelectionModif<K>[], changingItem?: MatOption<K>) {
    const optToSelect = modifications
      .filter((modif) => modif.action === 'select')
      .map((modif) => this.keyToMatOption.get(modif.key)!)
      .filter((i) => !this.select._selectionModel.isSelected(i));

    const optToDeselect = modifications
      .filter((modif) => modif.action === 'deselect')
      .map((modif) => this.keyToMatOption.get(modif.key)!)
      .filter((i) => this.select._selectionModel.isSelected(i));

    if (!optToSelect.length && !optToDeselect.length) return;

    // Prevent re-entry into onSelectionModelChanged handler until done doing this code
    this.ignoreSelectChange = true;

    const selection: K[] = this.select._selectionModel.selected
      .filter((s) => !optToDeselect.includes(s))
      .concat(optToSelect)
      .map((opt) => opt.value);

    if (!changingItem) {
      changingItem = this.select._keyManager.activeItem ?? undefined;
    }

    // Set value
    this.select._selectionModel.select(...optToSelect);
    this.select._selectionModel.deselect(...optToDeselect);
    this.refreshCheckStates();
    this.select.value = selection;

    // Fix active item styles
    if (changingItem) {
      setTimeout(() => {
        this.select._keyManager.setActiveItem(changingItem!);
      });
    }

    this.ignoreSelectChange = false;
  }

  /** Returns true if CTRL+A has been handled. */
  private handleCtrlA(event: KeyboardEvent) {
    if (event.key !== 'a' || !event.ctrlKey) return false;
    if (this.treeSelectionHandling === 'none') return false;

    if (this.treeSelectionHandling === 'last-level') {
      const opts = this.treeOptions.toArray();
      const allSelected = opts.every((opt) => opt.state === true);
      const modifications: SelectionModif<K>[] = opts.map((o) => ({
        action: allSelected || o.item.children ? 'deselect' : 'select',
        key: o.item.key,
      }));
      this.applyModifications(modifications);
    }

    return true;
  }

  private handleDeselection(treeOption: MdlTreeOption<K, T>, modifications?: SelectionModif<K>[]) {
    if (!modifications) modifications = [];

    if (this.treeSelectionHandling === 'last-level') {
      modifications.push({ key: treeOption.key, action: 'deselect' });
      treeOption.children?.forEach((c) => this.handleDeselection(c, modifications));
    }

    return modifications;
  }

  private handleExpandKeys(key: string) {
    if (key !== 'ArrowLeft' && key !== 'ArrowRight') return;
    const activeOption: MatOption<any> | null = this.select._keyManager.activeItem;
    if (!activeOption) return;

    const expandableOption = this.treeOptions.find((i) => i.option === activeOption);
    if (!expandableOption) return;

    if (key === 'ArrowLeft' && expandableOption.expanded) {
      expandableOption.expanded = false;
    } else if (key === 'ArrowRight' && !expandableOption.expanded) {
      expandableOption.expanded = true;
    }
  }

  private handleSelection(treeOption: MdlTreeOption<K, T>, modifications?: SelectionModif<K>[]) {
    if (!modifications) modifications = [];

    if (this.treeSelectionHandling === 'last-level') {
      modifications.push({
        key: treeOption.key,
        action: treeOption.children ? 'deselect' : 'select',
      });
      treeOption.children?.forEach((c) => this.handleSelection(c, modifications));
    }

    return modifications;
  }

  private itemDescendantsChecked(item: MdlTreeOption): boolean | null {
    if (!item.children) return false;
    const descendantsCheckStatuses = item.children.map((c) => {
      const itemSelected = this.select._selectionModel.isSelected(this.keyToMatOption.get(c.key)!);
      const itemChildrenSelected = this.itemDescendantsChecked(c);
      return itemSelected || itemChildrenSelected;
    });

    return descendantsCheckStatuses.every((x) => x === true)
      ? true
      : descendantsCheckStatuses.every((x) => x === false)
      ? false
      : null;
  }

  private onOptionsChanged(changes: any) {
    this.keyToMatOption = new Map(this.select.options.map((i) => [i.value, i]));
  }

  private onSelectionModelChanged(change: SelectionChange<MatOption<K>>) {
    if (this.ignoreSelectChange) return;
    if (this.treeSelectionHandling === 'none') return;

    const changingItem = change.added[0] ?? change.removed[0];
    const changingTreeItem = this.keyToTreeItemComponent.get(changingItem.value)!;

    // Last child selection, do nothing
    if (this.treeSelectionHandling === 'last-level' && !changingTreeItem?.item.children) return;

    const wasSelected =
      this.treeSelectionHandling === 'last-level'
        ? this.getCheckboxState(changingItem.value, false) !== false
        : !changingItem.selected;

    const modifications = wasSelected
      ? this.handleDeselection(changingTreeItem.item)
      : this.handleSelection(changingTreeItem.item);

    this.applyModifications(modifications, changingItem);
  }

  private refreshCheckStates() {
    for (let treeOption of this.keyToTreeItemComponent.values()) {
      treeOption.state = this.getCheckboxState(treeOption.item.key);
    }
  }
}
