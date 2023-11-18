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
import { CommonModule } from '@angular/common';
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
    CommonModule,
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
  @ViewChild(MatInput) private input!: MatInput;

  private _filter!: string;
  private _visible = false;

  @Output() public filterChange = new EventEmitter<string>();
  @Output()
  public visibleChange = new EventEmitter<boolean>();

  @HostBinding('style.display') public get hidden() {
    return this.visible ? 'block' : 'none';
  }

  @Input()
  public get filter(): string {
    return this._filter;
  }

  @Input()
  public get visible() {
    return this._visible;
  }

  public set filter(value: string) {
    this._filter = value;
    this.filterChange.emit(value);
  }

  public set visible(value) {
    this._visible = value;
    this.visibleChange.emit(value);
    if (value) {
      setTimeout(() => {
        this.input.focus();
      });
    }
  }
}
