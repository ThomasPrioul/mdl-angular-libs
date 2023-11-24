import { CommonModule } from '@angular/common';
import {
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
import { MatButtonModule } from '@angular/material/button';
import { MatOption, MatPseudoCheckboxModule, MatPseudoCheckboxState } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MdlTreeSelectDirective } from '../../directives/tree-select.directive';
import { MdlTreeOption } from '../../models/tree-option';

const initialPadding = 0; // 16;
const checkboxWidth = 18;
const checkboxPadding = 12;

/** Tree option used in material mdl "tree" select */
@Component({
  selector: 'mdl-tree-option',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatPseudoCheckboxModule],
  styleUrls: ['./tree-option.component.scss'],
  templateUrl: './tree-option.component.html',
})
export class MdlTreeOptionComponent<K, T> implements AfterContentInit, OnInit {
  private _expanded: boolean = false;
  private _state: boolean | null = false;

  @Input() public checkedState: MatPseudoCheckboxState = 'unchecked';
  @Input() public expandable: boolean = false;
  @Input() public item!: MdlTreeOption<K, T>;
  @Input() public level?: number;
  @Output() public expandedChange = new EventEmitter<boolean>();

  constructor(
    protected treeSelect: MdlTreeSelectDirective<K, T>,
    public option: MatOption<any>,
    private cd: ChangeDetectorRef
  ) {}

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
