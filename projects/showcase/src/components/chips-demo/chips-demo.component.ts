import { SelectionModel } from '@angular/cdk/collections';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  MdlAutocompleteStayOpenDirective,
  MdlSortedArrayPipe,
  MdlHighlightWithPipe,
} from 'mdl-angular';
import { Observable, Subject, combineLatest, of, timer } from 'rxjs';
import {
  debounceTime,
  delay,
  distinctUntilChanged,
  filter,
  finalize,
  map,
  scan,
  share,
  shareReplay,
  startWith,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { CODES, Code } from './codes';
import { MdlSpinnerComponent } from 'mdl-angular/spinner';

CODES.sort((a, b) => a.code - b.code);

function arrayChunks<T>(array: T[], chunk_size: number) {
  return [
    ...Array<number>(Math.ceil(array.length / chunk_size))
      .fill(0)
      .map((_, index) => index * chunk_size),
  ];
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
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
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
  @ViewChild(MdlAutocompleteStayOpenDirective)
  private readonly stayOpen!: MdlAutocompleteStayOpenDirective;

  protected allItems = CODES;
  protected allItemsMap = new Map(CODES.map((code) => [code.code, code]));
  protected filteredItems: Observable<Code[]>;
  protected inputCtrl = new FormControl<string | number | null>(null);
  protected selectedItems = new SelectionModel<number>(true, [CODES[0].code]);
  protected separatorKeysCodes: number[] = [ENTER, COMMA];
  protected isOpen = signal<boolean>(false);
  protected allLoaded = signal<boolean>(false);

  constructor() {
    this.filteredItems = combineLatest([
      toObservable(this.isOpen).pipe(
        // debounceTime(100),
        distinctUntilChanged(),
        tap((val) => console.log('isOpen=' + val))
      ),
      this.inputCtrl.valueChanges.pipe(
        debounceTime(500),
        startWith(null),
        map((search) => {
          if (search === null || search === '') return '';
          return (typeof search === 'number' ? search.toString() : search).toLowerCase();
        }),
        distinctUntilChanged(),
        tap((search) => console.log('filter=' + search))
      ),
    ]).pipe(
      switchMap(([isOpen, search]) => {
        console.log('Calculating items');
        const chunkSize = 20;
        const chunks = arrayChunks(this.allItems, chunkSize);

        return timer(0, 0).pipe(
          scan((acc: Code[], i: number) => {
            if (i === 0 && isOpen) this.allLoaded.set(false);
            const newItems = this.allItems
              .slice(chunks[i], chunks[i] + chunkSize)
              .filter((item) => this.filterCode(search, item));
            acc.push(...newItems);
            return acc;
          }, []),
          take(isOpen ? chunks.length : 1),
          finalize(() => {
            if (isOpen) return this.allLoaded.set(true);
          })
        );
      }),
      shareReplay()
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
    this.inputCtrl.setValue(null);
  }

  protected selected(event: MatAutocompleteSelectedEvent): void {
    // Toggle item in selection list
    const value = event.option.value;
    this.selectedItems.isSelected(value)
      ? this.selectedItems.deselect(value)
      : this.selectedItems.select(value);

    // Reset form control and input text
    this.inputCtrl.setValue(null);
    this.input.nativeElement.value = '';

    this.stayOpen.itemSelected(event);
  }

  protected trackByCode(index: number, item: Code) {
    return item.code;
  }

  private filterCode(value: string, item: Code): boolean {
    return !value ? true : (item.code + ' ' + item.libelle).toLowerCase().includes(value);
  }
}
