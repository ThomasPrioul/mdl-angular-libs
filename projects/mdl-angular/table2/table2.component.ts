import {
  Component,
  AfterContentInit,
  ContentChildren,
  QueryList,
  ContentChild,
  ViewChild,
  Input,
  Pipe,
  PipeTransform,
  AfterViewInit,
  ElementRef,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Optional,
  OnDestroy,
  TemplateRef,
  Injectable,
  forwardRef,
  OnChanges,
  SimpleChanges,
  AfterViewChecked,
} from '@angular/core';
import {
  MatColumnDef,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatSort, MatSortModule, Sort, SortDirection } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { ColumnDisplayInfo, ColumnsComponent } from './columns/columns.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { MdlSpinnerComponent } from 'mdl-angular/spinner';
import { MdlFullscreenButtonDirective } from 'mdl-angular/fullscreen';
import { matMenuAnimations } from '@angular/material/menu';
import {
  Observable,
  Subject,
  Subscription,
  debounce,
  debounceTime,
  map,
  merge,
  of,
  share,
  startWith,
  takeUntil,
  tap,
  timer,
} from 'rxjs';

export type PaginationType = 'none' | 'frontend' | 'backend';
export type ShouldRequestBackendType = {
  pageNum: number;
  pageSize: number;
  orderBy: string;
  orderDirection: SortDirection;
  searchValue: string;
};

@Component({
  selector: 'mdl-table2',
  templateUrl: 'table2.component.html',
  styleUrls: ['table2.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [matMenuAnimations.transformMenu],
  // providers: [{ provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl }],
  imports: [
    // NG
    CommonModule,

    // Material
    MatDividerModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatSortModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,

    // CDK
    OverlayModule,
    A11yModule,

    // MDL
    MdlFullscreenButtonDirective,
    MdlSpinnerComponent,

    // This
    forwardRef(() => WithSelectionPipe),
    SearchbarComponent,
    ColumnsComponent,
  ],
})
export class MdlTableComponent<T>
  implements AfterContentInit, AfterViewInit, OnDestroy, OnChanges, AfterViewChecked
{
  private readonly _destroy = new Subject<void>();
  private readonly filterChange$: Observable<string>;

  private _actionButtons: boolean | undefined;
  private _columnsEditor: boolean = false;
  private _dataSource!: readonly T[] | MatTableDataSource<T>;
  private _displayedColumns!: ColumnDisplayInfo[];
  private _filter: string = '';
  private _fullscreenButton: boolean = false;
  private _header: boolean | undefined = undefined;
  private _pageSizes: number[] = [10, 25, 100];
  private _requerySubscription?: Subscription;
  private _searchBar: boolean = false;
  private _selection = false;
  private requiresPaginationUpdate: boolean = false;

  @ViewChild(SearchbarComponent)
  protected readonly searchbar!: SearchbarComponent;

  protected columnsOverlayOpen: boolean = false;

  @ContentChild(MatNoDataRow) public noDataRow!: MatNoDataRow;
  @ContentChildren(MatColumnDef) public columnDefs!: QueryList<MatColumnDef>;
  @ContentChildren(MatHeaderRowDef) public headerRowDefs!: QueryList<MatHeaderRowDef>;
  @ContentChildren(MatRowDef) public rowDefs!: QueryList<MatRowDef<T>>;
  @Input()
  public allowExpandFn?: (item: T) => boolean;
  @Input() public detailsRow: TemplateRef<any> | null = null;
  @Input() public loading: boolean | null = null;
  @Input() public pageSize?: number;
  @Input() public pagination: PaginationType = 'none';
  @Input() public paginatorAddons: TemplateRef<any> | null = null;
  @Input() public rowClasses?: (row: T) => string[];
  @Input() public title?: string;
  @Input() public totalLength?: number;
  @Output() public displayedColumnsChange = new EventEmitter<ColumnDisplayInfo[]>();
  @Output() public filterChange = new EventEmitter<string>();
  @Output() public shouldRequestBackend = new EventEmitter<ShouldRequestBackendType>();
  @ViewChild(MatPaginator) public paginator?: MatPaginator;
  @ViewChild(MatTable, { static: true }) public table!: MatTable<T>;

  public expandedRow: T | null = null;
  public selectionModel = new SelectionModel<T>(true, []);

  constructor(
    @Optional() private _sort: MatSort | null,
    protected el: ElementRef,
    private cd: ChangeDetectorRef
  ) {
    this.filterChange$ = this.filterChange.pipe(
      debounce((filter) => (filter ? timer(500) : of(filter))),
      share()
    );
  }

  @Output()
  public get selectionChanged() {
    return this.selectionModel.changed;
  }

  @Input()
  public get actionButtons(): BooleanInput {
    return this._actionButtons;
  }

  @Input()
  public get columnsEditor(): BooleanInput {
    return this._columnsEditor;
  }

  @Input()
  public get dataSource(): readonly T[] | MatTableDataSource<T> {
    return this._dataSource;
  }

  @Input()
  public get displayedColumns(): ColumnDisplayInfo[] {
    return this._displayedColumns;
  }

  @Input()
  public get filter() {
    return this._filter;
  }

  @Input()
  public get fullscreenButton(): BooleanInput {
    return this._fullscreenButton;
  }

  @Input()
  public get header() {
    return this._header;
  }

  @Input()
  public get pageSizes(): number[] {
    return this._pageSizes;
  }

  @Input()
  public get searchBar(): BooleanInput {
    return this._searchBar;
  }

  @Input()
  public get selection() {
    return this._selection;
  }

  public set actionButtons(value: BooleanInput) {
    this._actionButtons = coerceBooleanProperty(value);
  }

  public set columnsEditor(value: BooleanInput) {
    this._columnsEditor = coerceBooleanProperty(value);
  }

  public set dataSource(value: readonly T[] | MatTableDataSource<T>) {
    this._dataSource = value;
  }

  public set displayedColumns(value: ColumnDisplayInfo[]) {
    this._displayedColumns = value;
    this.displayedColumnsChange.emit(value);
  }

  public set filter(value: string) {
    this.filterChange.emit((this._filter = value));
  }

  public set fullscreenButton(value: BooleanInput) {
    this._fullscreenButton = coerceBooleanProperty(value);
  }

  public set header(value: BooleanInput) {
    this._header = coerceBooleanProperty(value);
  }

  /** Array with page sizes. */
  public set pageSizes(value: number[]) {
    if (value.length === 0) throw new Error('Page length options cannot be empty');
    if (value.some((x) => x <= 0))
      throw new Error('Page length options cannot contain 0 or negative values');
    this._pageSizes = value;
  }

  public set searchBar(value: BooleanInput) {
    this._searchBar = coerceBooleanProperty(value);
  }

  public get selected() {
    return this.selectionModel.selected;
  }

  public set selection(value: BooleanInput) {
    this._selection = coerceBooleanProperty(value);
  }

  public get sort() {
    return this._sort;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const paginationChanges = changes['pagination'];
    if (!paginationChanges || paginationChanges.isFirstChange()) return;

    this.requiresPaginationUpdate = true;
    if (!(this.dataSource instanceof MatTableDataSource)) return;

    if (
      paginationChanges.previousValue !== 'backend' &&
      paginationChanges.currentValue === 'backend'
    ) {
      this.dataSource.paginator = null;
      this.dataSource.filter = '';
      this.dataSource.data = [];
    }

    if (paginationChanges.currentValue !== 'backend') {
      this.dataSource.filter = this.filter;
    }
  }

  public ngAfterContentInit() {
    this.columnDefs.forEach((columnDef) => this.table.addColumnDef(columnDef));
    this.rowDefs.forEach((rowDef) => this.table.addRowDef(rowDef));
    this.headerRowDefs.forEach((headerRowDef) => this.table.addHeaderRowDef(headerRowDef));
    this.table.setNoDataRow(this.noDataRow);
  }

  public ngAfterViewInit() {
    this.configurePaginationCallbacks();
  }

  public ngAfterViewChecked(): void {
    if (this.requiresPaginationUpdate) {
      this.requiresPaginationUpdate = false;
      this.configurePaginationCallbacks();
    }
  }

  public ngOnDestroy(): void {
    this._requerySubscription?.unsubscribe();
    this._destroy.next();
    this._destroy.complete();
    this.shouldRequestBackend.complete();
  }

  @Input() public trackByFn: (index: number, row: T) => number | string = (
    index: number,
    row: T
  ) => {
    return index;
  };

  public clearSelection() {
    this.selectionModel.clear();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  public isAllSelected() {
    const numSelected = this.selectionModel.selected.length;
    const numRows =
      this.dataSource instanceof MatTableDataSource
        ? this.dataSource.data.length
        : this.dataSource.length;

    return numSelected === numRows;
  }

  /** Resets page index to 0 and forces page changed event to be triggered.
   * @see shouldRequestBackend emits a value in consequence.
   */
  public resetPageIndex() {
    if (!this.paginator) return;

    if (this.paginator.pageIndex !== 0) {
      this.paginator.firstPage();
      return;
    }

    this.paginator.page.emit({
      pageIndex: 0,
      previousPageIndex: 0,
      pageSize: this.paginator.pageSize,
      length: this.paginator.length,
    });
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  public toggleAllRows() {
    if (this.isAllSelected()) {
      this.selectionModel.clear();
      return;
    }

    let dataArray =
      this.dataSource instanceof MatTableDataSource ? this.dataSource.data : this.dataSource;

    this.selectionModel.select(...dataArray);
  }

  protected expandRow(row: T) {
    if (
      !window.getSelection()?.isCollapsed ||
      // (this.detailsRowTemplate === null && this.detailsRow === null) ||
      (this.allowExpandFn && !this.allowExpandFn(row))
    )
      return;
    this.expandedRow = this.expandedRow === row ? null : row;
  }

  protected filterChanged(filter: string) {
    if (this.pagination === 'frontend' && this.dataSource instanceof MatTableDataSource)
      this.dataSource.filter = filter;

    this.filter = filter;
  }

  protected hasNoData(): BooleanInput {
    return this.dataSource instanceof MatTableDataSource
      ? this.dataSource.data.length === 0
      : this.dataSource.length === 0;
  }

  protected onColumnsUpdated(columns: ColumnDisplayInfo[]) {
    this.displayedColumns = columns;
    this.columnsOverlayOpen = false;
    this.cd.detectChanges();
  }

  protected rowClass(row: T, main: boolean = true) {
    let classes: string[] = [];
    if (!main && this.allowExpandFn && !this.allowExpandFn(row)) classes.push('hidden');
    if (this.expandedRow === row) classes.push('expanded');
    if (this.selectionModel.isSelected(row)) classes.push('selected');
    if (this.rowClasses) classes.push(...this.rowClasses(row));
    return classes.length === 1 ? classes[0] : classes;
  }

  private configurePaginationCallbacks() {
    this._requerySubscription?.unsubscribe();
    this._requerySubscription = undefined;

    if (this.dataSource instanceof MatTableDataSource) {
      if (this.pagination !== 'backend') {
        this.dataSource.sort = this._sort;
      }

      if (this.pagination === 'frontend') {
        this.dataSource.paginator = this.paginator ?? null;
      } else {
        this.dataSource.paginator = null;
      }
    }

    // If the user changes the sort order or types something in the search input, reset back to the first page.
    if (this._sort) {
      this.registerResetPageOnSortOrFilter();
    }

    // If using backend pagination, emit an event right now and emit each time the page changes
    if (this.pagination === 'backend') {
      this.registerBackendQueryEvent();
    }
  }

  private registerBackendQueryEvent() {
    if (!this._requerySubscription) this._requerySubscription = new Subscription();
    const requerySources: Observable<string | Sort | PageEvent>[] = [this.filterChange$];
    if (this.sort) requerySources.push(this.sort.sortChange);
    if (this.paginator) requerySources.push(this.paginator.page);

    this._requerySubscription.add(
      merge(...requerySources)
        .pipe(
          startWith({}),
          takeUntil(this._destroy),
          map(
            () =>
              <ShouldRequestBackendType>{
                pageNum: this.paginator!.pageIndex + 1,
                pageSize: this.paginator!.pageSize,
                orderBy: this.sort?.active ?? '',
                orderDirection: this.sort?.direction ?? '',
                searchValue: this.filter,
              }
          ),
          tap((info) => this.shouldRequestBackend.emit(info))
        )
        .subscribe()
    );
  }

  private registerResetPageOnSortOrFilter() {
    if (!this._requerySubscription) this._requerySubscription = new Subscription();
    this._requerySubscription.add(
      merge(this._sort!.sortChange, this.filterChange$)
        .pipe(
          takeUntil(this._destroy),
          tap(() => {
            if (this.paginator) this.paginator.pageIndex = 0;
          })
        )
        .subscribe()
    );
  }
}

@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  public changes = new Subject<void>();
  public firstPageLabel = 'Première page';
  public itemsPerPageLabel = 'Eléments par page:';
  public lastPageLabel = 'Dernière page';
  public nextPageLabel = 'Page suivante';
  public previousPageLabel = 'Page précédente';

  public getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return 'Page 1 sur 1';
    }
    const amountPages = Math.ceil(length / pageSize);
    const startIndex = page * pageSize + 1;
    const endIndex = (page + 1) * pageSize;
    return `Page ${
      page + 1
    } sur ${amountPages} .......... [${startIndex} à ${endIndex} / ${length}]`;
  }
}

@Pipe({
  standalone: true,
  name: 'withSelection',
})
export class WithSelectionPipe implements PipeTransform {
  public transform(displayedColumns: string[] | ColumnDisplayInfo[], selection: boolean) {
    if (typeof displayedColumns[0] === 'string') {
      return selection ? ['selection', ...displayedColumns] : displayedColumns;
    } else {
      let cols = (displayedColumns as ColumnDisplayInfo[])
        .filter((c) => c.visible !== false)
        .map((c) => c.name);
      return selection ? ['selection', ...cols] : cols;
    }
  }
}
