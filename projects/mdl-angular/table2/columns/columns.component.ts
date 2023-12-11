import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

export type ColumnDisplayInfo = {
  name: string;
  label?: string;
  visible: boolean;
  canHide: boolean;
};

@Component({
  selector: 'mdl-table-columns',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatCheckboxModule,
    MatPseudoCheckboxModule,
    MatSlideToggleModule,
    MatButtonModule,
    DragDropModule,
    A11yModule,
  ],
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnsComponent {
  protected _columns?: ColumnDisplayInfo[];

  @Output() public canceled = new EventEmitter<void>();
  @Output() public submitted = new EventEmitter<ColumnDisplayInfo[]>();

  @Input()
  public get columns(): ColumnDisplayInfo[] | undefined {
    return this._columns;
  }

  public set columns(value: ColumnDisplayInfo[] | undefined) {
    this._columns = value?.map((x) => ({ ...x }));
  }

  protected allStatus(columns: ColumnDisplayInfo[]) {
    return columns.filter((c) => c.canHide).every((c) => c.visible);
  }

  protected drop(event: CdkDragDrop<ColumnDisplayInfo[]>) {
    moveItemInArray(this._columns!, event.previousIndex, event.currentIndex);
  }

  protected indeterminateStatus(columns: ColumnDisplayInfo[]) {
    columns = columns.filter((c) => c.canHide);
    const nbChecked = columns.filter((c) => c.visible).length;
    return nbChecked > 0 && nbChecked < columns.length;
  }

  protected moveItemDown(index: number) {
    moveItemInArray(this._columns!, index, index + 1);
  }

  protected moveItemUp(index: number, btn: MatIconButton) {
    moveItemInArray(this._columns!, index, index - 1);

    // Fix the focus when item moves "before" in the DOM
    setTimeout(() => {
      (btn._elementRef.nativeElement as HTMLButtonElement).focus();
    });
  }

  protected onAllClicked(event: MatCheckboxChange) {
    this.columns?.filter((c) => c.canHide).forEach((c) => (c.visible = event.checked));
  }

  protected trackByColumnName(index: number, item: ColumnDisplayInfo) {
    return item.name;
  }
}
