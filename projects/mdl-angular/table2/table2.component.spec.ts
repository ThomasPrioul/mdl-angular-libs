import { Component, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatColumnDef, MatHeaderCellDef, MatCellDef, MatHeaderRowDef, MatRowDef, MatNoDataRow } from '@angular/material/table';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { By } from '@angular/platform-browser';

import { MdlTableComponent, WithSelectionPipe, MdlTableComponent as Table2 } from './table2.component';
import { ColumnDisplayInfo } from './columns/columns.component';

// ─── Minimal test host ───────────────────────────────────────────────────────

type Row = { id: number; name: string };

@Component({
  standalone: true,
  imports: [
    MdlTableComponent,
    MatSortModule,
    MatTableModule,
  ],
  template: `
    <mdl-table
      [dataSource]="rows"
      [displayedColumns]="cols"
      [pagination]="'none'"
      [title]="title"
      [refreshButton]="refreshButton">
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef>ID</th>
        <td mat-cell *matCellDef="let row">{{ row.id }}</td>
      </ng-container>
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Name</th>
        <td mat-cell *matCellDef="let row">{{ row.name }}</td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="colNames"></tr>
      <tr mat-row *matRowDef="let row; columns: colNames"></tr>
    </mdl-table>
  `,
})
class TestHostComponent {
  @ViewChild(MdlTableComponent) table!: MdlTableComponent<Row>;
  rows: Row[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ];
  cols: ColumnDisplayInfo<Row>[] = [
    { name: 'id' },
    { name: 'name' },
  ];
  colNames = ['id', 'name'];
  title?: string;
  refreshButton: any = false;
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('WithSelectionPipe', () => {
  const pipe = new WithSelectionPipe();

  it('prepends selection column when selection=true (string array)', () => {
    expect(pipe.transform(['a', 'b'], true)).toEqual(['selection', 'a', 'b']);
  });

  it('returns original when selection=false (string array)', () => {
    expect(pipe.transform(['a', 'b'], false)).toEqual(['a', 'b']);
  });

  it('filters invisible columns from ColumnDisplayInfo[]', () => {
    const cols: ColumnDisplayInfo[] = [
      { name: 'a', visible: true },
      { name: 'b', visible: false },
      { name: 'c' },
    ];
    expect(pipe.transform(cols, false)).toEqual(['a', 'c']);
  });

  it('prepends selection to visible ColumnDisplayInfo columns', () => {
    const cols: ColumnDisplayInfo[] = [
      { name: 'x', visible: true },
      { name: 'y', visible: false },
    ];
    expect(pipe.transform(cols, true)).toEqual(['selection', 'x']);
  });
});

describe('MdlTableComponent — logic', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideAnimationsAsync()],
    });
  });

  function createFixture(overrides: Partial<TestHostComponent> = {}) {
    const fixture = TestBed.createComponent(TestHostComponent);
    Object.assign(fixture.componentInstance, overrides);
    fixture.detectChanges();
    return fixture;
  }

  describe('pageSizes setter', () => {
    it('throws when empty array', () => {
      const { componentInstance: host } = createFixture();
      expect(() => (host.table.pageSizes = [])).toThrow('Page length options cannot be empty');
    });

    it('throws when array contains 0', () => {
      const { componentInstance: host } = createFixture();
      expect(() => (host.table.pageSizes = [0, 10])).toThrow(
        'Page length options cannot contain 0 or negative values',
      );
    });

    it('throws when array contains negative', () => {
      const { componentInstance: host } = createFixture();
      expect(() => (host.table.pageSizes = [-1])).toThrow();
    });

    it('accepts valid sizes', () => {
      const { componentInstance: host } = createFixture();
      expect(() => (host.table.pageSizes = [5, 10, 25])).not.toThrow();
      expect(host.table.pageSizes).toEqual([5, 10, 25]);
    });
  });

  describe('hasNoData()', () => {
    it('returns true when array dataSource is empty', () => {
      const { componentInstance: host } = createFixture({ rows: [] });
      expect((host.table as any).hasNoData()).toBe(true);
    });

    it('returns false when array dataSource has rows', () => {
      const { componentInstance: host } = createFixture();
      expect((host.table as any).hasNoData()).toBe(false);
    });

    it('returns true when MatTableDataSource is empty', () => {
      const fixture = createFixture();
      fixture.componentInstance.table.dataSource = new MatTableDataSource<Row>([]);
      expect((fixture.componentInstance.table as any).hasNoData()).toBe(true);
    });

    it('returns false when MatTableDataSource has data', () => {
      const fixture = createFixture();
      fixture.componentInstance.table.dataSource = new MatTableDataSource([{ id: 1, name: 'X' }]);
      expect((fixture.componentInstance.table as any).hasNoData()).toBe(false);
    });
  });

  describe('selection model', () => {
    it('starts with empty selection', () => {
      const { componentInstance: host } = createFixture();
      expect(host.table.selected).toEqual([]);
    });

    it('clearSelection() empties the selection', () => {
      const { componentInstance: host } = createFixture();
      host.table.selectionModel.select(...host.rows);
      expect(host.table.selected.length).toBe(3);
      host.table.clearSelection();
      expect(host.table.selected.length).toBe(0);
    });

    it('isAllVisibleSelected() returns true when all rows selected', () => {
      const { componentInstance: host } = createFixture();
      host.table.selectionModel.select(...host.rows);
      expect(host.table.isAllVisibleSelected()).toBe(true);
    });

    it('isAllVisibleSelected() returns false when some rows selected', () => {
      const { componentInstance: host } = createFixture();
      host.table.selectionModel.select(host.rows[0]);
      expect(host.table.isAllVisibleSelected()).toBe(false);
    });

    it('toggleAllVisibleRows() selects all when none selected', () => {
      const { componentInstance: host } = createFixture();
      host.table.toggleAllVisibleRows();
      expect(host.table.selected.length).toBe(3);
    });

    it('toggleAllVisibleRows() clears all when all already selected', () => {
      const { componentInstance: host } = createFixture();
      host.table.selectionModel.select(...host.rows);
      host.table.toggleAllVisibleRows();
      expect(host.table.selected.length).toBe(0);
    });
  });

  describe('filter setter', () => {
    it('emits filterChange event', () => {
      const { componentInstance: host } = createFixture();
      const emitted: string[] = [];
      host.table.filterChange.subscribe((v) => emitted.push(v));
      host.table.filter = 'Alice';
      expect(emitted).toContain('Alice');
    });

    it('applies filter to MatTableDataSource in frontend mode', () => {
      const fixture = createFixture();
      const ds = new MatTableDataSource([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]);
      fixture.componentInstance.table.dataSource = ds;
      fixture.componentInstance.table.pagination = 'frontend';
      fixture.detectChanges();
      fixture.componentInstance.table.filter = 'alice';
      expect(ds.filter).toBe('alice');
    });
  });
});

describe('MdlTableComponent — rendering', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideAnimationsAsync()],
    });
  });

  it('renders a row per data item (main rows only, not expansion rows)', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('tr.normal-row'));
    expect(rows.length).toBe(3);
  });

  it('renders header row', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const header = fixture.debugElement.query(By.css('tr[mat-header-row]'));
    expect(header).not.toBeNull();
  });

  it('does not render a table header section when no title/searchBar/actionButtons', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const header = fixture.debugElement.query(By.css('.header'));
    expect(header).toBeNull();
  });

  it('renders title in header when title is set', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.title = 'My Table';
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('.title'));
    expect(title?.nativeElement.textContent.trim()).toBe('My Table');
  });

  it('shows refresh button when refreshButton=true', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.refreshButton = true;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('[matTooltip="Rafraîchir"]'));
    expect(btn).not.toBeNull();
  });

  it('emits shouldRefresh when refresh button clicked', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.refreshButton = true;
    fixture.detectChanges();
    const emitted: Date[] = [];
    fixture.componentInstance.table.shouldRefresh.subscribe((d) => emitted.push(d));
    const btn = fixture.debugElement.query(By.css('[matTooltip="Rafraîchir"]'));
    btn.nativeElement.click();
    expect(emitted.length).toBe(1);
    expect(emitted[0]).toBeInstanceOf(Date);
  });
});
