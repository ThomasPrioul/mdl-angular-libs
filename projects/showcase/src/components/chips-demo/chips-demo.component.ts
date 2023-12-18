import { SelectionModel } from '@angular/cdk/collections';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteActivatedEvent,
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  MdlAutocompleteStayOpenDirective,
  MdlSortedArrayPipe,
  MdlHighlightWithPipe,
} from 'mdl-angular';
import { Observable, combineLatest, timer } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
  scan,
  shareReplay,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { CODES, Code } from './codes';
import { MdlSpinnerComponent } from 'mdl-angular/spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';

CODES.sort((a, b) => a.code - b.code);

const prodCodes = CODES;

// const prodCodes: Code[] = Array(8)
//   .fill(0)
//   .flatMap((i) =>
//     CODES.map((code) => ({
//       ...code,
//       code: code.code + 100000 * i,
//       libelle: code.libelle + `(${i})`,
//     }))
//   );

function arrayChunks<T>(array: T[], chunkSize: number) {
  let target = chunkSize;

  const indexes = [
    0,
    ...array.reduce((acc: number[], val, i) => {
      if (i === target) {
        acc.push(i);
        chunkSize *= 2;
        target = i + chunkSize;
      }
      return acc;
    }, []),
  ];

  if (target !== array.length - 1) indexes.push(array.length);
  return indexes;
}

/**
 * @title Chips Autocomplete
 */
@Component({
  selector: 'app-chips-demo',
  templateUrl: 'chips-demo.component.html',
  styleUrls: ['chips-demo.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    ScrollingModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule,
    MdlAutocompleteStayOpenDirective,
    MdlHighlightWithPipe,
    MdlSortedArrayPipe,
    MdlSpinnerComponent,
  ],
})
export class ChipsDemoComponent {
  @ViewChild('input')
  private readonly input!: ElementRef<HTMLInputElement>;

  protected allItems = prodCodes;
  protected allItemsMap = new Map(prodCodes.map((code) => [code.code, code]));
  protected filteredItems$: Observable<Code[]>;
  protected inputCtrl = new FormControl<string | number | null>(null);
  protected selectedItems = new SelectionModel<number>(true, [prodCodes[0].code]);
  protected separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor() {
    this.filteredItems$ = this.inputCtrl.valueChanges.pipe(
      debounceTime(500),
      startWith(null),
      map((search) => {
        if (search === null || search === '') return '';
        return (typeof search === 'number' ? search.toString() : search).toLowerCase();
      }),
      distinctUntilChanged(),
      map((search) => this.allItems.filter((item) => this.filterCode(search, item)))
    );
  }

  /*
  protected add(event: MatChipInputEvent): void {
    const values = (event.value || '')
      .trim()
      .split(/[,\n]/g)
      .filter((val) => val !== '')
      .map((val) => parseInt(val));

    values.forEach((value) => {
      //  && this.allItems.includes(value)
      if (!this.selectedItems.isSelected(value)) {
        this.selectedItems.select(value);
      }
    });

    this.inputCtrl.setValue(null);
  }
  */
  protected remove(item: number): void {
    this.selectedItems.deselect(item);
    // this.inputCtrl.setValue(null);
  }

  protected selected(event: MatAutocompleteSelectedEvent): void {
    // Reset form control and input text
    this.inputCtrl.setValue(this.input.nativeElement.value);

    // Toggle item in selection list
    const value = event.option.value;
    this.selectedItems.isSelected(value)
      ? this.selectedItems.deselect(value)
      : this.selectedItems.select(value);
  }

  protected trackByCode(index: number, item: Code) {
    return item.code;
  }

  private filterCode(value: string, item: Code): boolean {
    return !value ? true : (item.code + ' ' + item.libelle).toLowerCase().includes(value);
  }
}
