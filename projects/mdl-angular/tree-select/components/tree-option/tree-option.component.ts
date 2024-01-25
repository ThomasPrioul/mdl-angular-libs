import {
  APP_INITIALIZER,
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatOption, MatPseudoCheckboxModule, MatPseudoCheckboxState } from '@angular/material/core';
import { MdlTreeSelectDirective } from '../../directives/tree-select.directive';
import { MdlTreeOption } from '../../models/tree-option';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { registerInlineMaterialIcons } from 'mdl-angular';

const initialPadding = 0; // 16;
const checkboxWidth = 18;
const checkboxPadding = 12;

/** Tree option used in material mdl "tree" select */
@Component({
  selector: 'mdl-tree-option',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./tree-option.component.scss'],
  templateUrl: './tree-option.component.html',
  imports: [MatIconModule, MatButtonModule, MatPseudoCheckboxModule],
})
export class MdlTreeOptionComponent<K, T> implements AfterContentInit, OnInit {
  private static _iconInitialized = false;

  private _expanded: boolean = false;
  private _state: boolean | null = false;

  @Input() public expandable: boolean = false;
  @Input() public item!: MdlTreeOption<K, T>;
  @Input() public level?: number;
  @Output() public expandedChange = new EventEmitter<boolean>();

  constructor(
    protected treeSelect: MdlTreeSelectDirective<K, T>,
    public option: MatOption<any>,
    private cd: ChangeDetectorRef
  ) {
    if (!MdlTreeOptionComponent._iconInitialized) {
      registerInlineMaterialIcons({
        expand_more: `<svg width="12" height="8" viewBox="-6 -4 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.00156 7.83991L0.30804 2.00599C-0.10284 1.58455 -0.10284 0.898152 0.309 0.476712C0.50724 0.272232 0.7722 0.159912 1.05468 0.159912C1.33644 0.159912 1.6014 0.272232 1.8006 0.476712L6.00156 4.78135L10.2025 0.476712C10.6751 -0.00808796 11.4875 0.063912 11.8597 0.691752C12.1151 1.12183 12.0064 1.68631 11.6593 2.04151L6.00156 7.83991Z" fill="currentColor"/>
        </svg>`,
      });
      MdlTreeOptionComponent._iconInitialized = true;
    }
  }

  @Input()
  public set expanded(value: boolean) {
    this._expanded = value;
    this.expandedChange.emit(value);
  }

  @Input()
  public get state(): boolean | null {
    return this._state;
  }

  public get expanded(): boolean {
    return this._expanded;
  }

  public set state(value: boolean | null) {
    if (value === this._state) return;
    this._state = value;
    this.cd.markForCheck();
  }

  @HostBinding('class.expandable') private get isExpandable() {
    return this.expandable;
  }

  @HostBinding('style.font-weight') private get isSelected() {
    return this.state !== false ? '500' : undefined;
  }

  public ngOnInit(): void {
    this.expandable = !!this.item.children;
  }

  public ngAfterContentInit() {
    this.option._getHostElement().style.paddingLeft = `${
      initialPadding + (checkboxWidth + checkboxPadding) * (this.level ?? this.item.level)
    }px`;
  }

  protected onExpandClick(event: MouseEvent) {
    event.stopPropagation();
    this.expanded = !this.expanded;
    this.treeSelect.setActiveItem(this.option);
  }
}
