import { SelectionModel } from '@angular/cdk/collections';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MdlAutocompleteStayOpenDirective, MdlSortedArrayPipe } from 'mdl-angular';
import { Observable, Subject } from 'rxjs';
import { delay, map, startWith, takeUntil, tap } from 'rxjs/operators';
import { CODES, Code } from './codes';

CODES.sort((a, b) => a.code - b.code);

/**
 * @title Chips Autocomplete
 */
@Component({
  selector: 'app-chips-demo',
  templateUrl: 'chips-demo.component.html',
  styleUrls: ['chips-demo.component.scss'],
  standalone: true,
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
    MdlSortedArrayPipe,
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

  constructor() {
    this.filteredItems = this.inputCtrl.valueChanges.pipe(
      startWith(null),
      map((search) => this._filter(search))
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

  private _filter(value: string | number | null): Code[] {
    if (value === null || value === '') return this.allItems;
    const filterValue = (typeof value === 'number' ? value.toString() : value).toLowerCase();

    return this.allItems.filter((item) =>
      (item.code + ' ' + item.libelle).toLowerCase().includes(filterValue)
    );
  }
}
