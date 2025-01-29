import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewContainerRef,
  forwardRef,
  inject,
} from '@angular/core';
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
import { MatTable } from '@angular/material/table';
import { SortDirection } from '@angular/material/sort';

/** Info used by the table for displayed columns, the model is manipulated with the table's column editor. */
export type ColumnDisplayInfo<T = any> = {
  /** Cdk column name, used for default sorting behavior. (matColumnDef.name) */
  name: string;

  /** Optional label to use in column edition popup, if absent the inline value of the mat-header-cell will be used. */
  label?: string;

  /** Set this to false if the column should not be visible */
  visible?: boolean;

  /** Set this to false if the column should not have an option for visibility in the popup. */
  canHide?: boolean;

  /** Custom sort implementation for this column. */
  sortFunction?: (itemA: T, itemB: T, direction: SortDirection) => number;

  /** Specifies which member should be used for sorting comparison.
   *  Useful when column properties are nested in the object or are not primitive (DateTime, etc).*/
  sortMember?: (item: T) => string | number | undefined;
};

@Component({
    selector: 'mdl-table-columns',
    imports: [
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
        forwardRef(() => ColumnNameDirective),
    ],
    templateUrl: './columns.component.html',
    styleUrls: ['./columns.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnsComponent {
  protected _columns?: ColumnDisplayInfo[];

  @Input()
  public matTable?: MatTable<any>;
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
    return columns.filter((c) => c.canHide !== false).every((c) => c.visible !== false);
  }

  protected drop(event: CdkDragDrop<ColumnDisplayInfo[]>) {
    moveItemInArray(this._columns!, event.previousIndex, event.currentIndex);
  }

  protected getColumnTemplate(columnName: string) {
    //@ts-ignore
    const columnDef = this.matTable?._columnDefsByName.get(columnName);
    return columnDef?.headerCell.template;
  }

  protected indeterminateStatus(columns: ColumnDisplayInfo[]) {
    columns = columns.filter((c) => c.canHide !== false);
    const nbChecked = columns.filter((c) => c.visible !== false).length;
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
    this.columns?.filter((c) => c.canHide !== false).forEach((c) => (c.visible = event.checked));
  }

  protected trackByColumnName(index: number, item: ColumnDisplayInfo) {
    return item.name;
  }
}

@Directive({
  selector: '[mdlColumnName]',
  standalone: true,
})
export class ColumnNameDirective {
  private _template?: TemplateRef<any> | undefined;
  private viewContainer = inject(ViewContainerRef);

  @Input('mdlColumnName')
  public get template(): TemplateRef<any> | undefined {
    return this._template;
  }

  public set template(value: TemplateRef<any> | undefined) {
    if (!this._template && value) {
      this.viewContainer.createEmbeddedView(value).detach();
    } else {
      this.viewContainer.clear();
    }
    this._template = value;
  }
}
