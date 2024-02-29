import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'mdl-table-searchbar',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
  ],
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchbarComponent {
  private _filter: string = '';
  private _placeHolder: string = '';

  @Output() public filterChange = new EventEmitter<string>();

  @Input()
  public get filter(): string {
    return this._filter;
  }

  @Input()
  public get placeHolder(): string {
    return this._placeHolder;
  }

  public set filter(value: string) {
    if (this._filter === value) return;
    this._filter = value;
    this.filterChange.emit(value);
  }

  public set placeHolder(value: string) {
    this._placeHolder = value;
  }
}
