import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DateTime } from 'luxon';
import { MdlZoomButtonComponent } from 'mdl-angular/zoom-button';
import { ConsistComponent } from '../../components/consist/consist.component';
import { CabinState, TrainModel } from '../../models/met';
import { ReversePipe } from '../../pipes/reverse.pipe';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { map, startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { EXAMPLE_Z50000, EXAMPLE_Z57000 } from '../../data/trains';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LuxonModule } from 'luxon-angular';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './diag.component.html',
  styleUrls: ['./diag.component.scss'],
  standalone: true,
  imports: [
    // NG
    CommonModule,
    ReactiveFormsModule,

    // Material
    MatButtonToggleModule,
    MatIconModule,
    MatSlideToggleModule,

    // Luxon
    LuxonModule,

    // MDL
    MdlZoomButtonComponent,

    // App
    ConsistComponent,
    ReversePipe,
  ],
})
export class DiagComponent {
  protected leadingCabinRightSide: Signal<boolean>;
  protected reversed: boolean = false;
  protected topView: Signal<boolean>;
  protected train = signal<TrainModel>(EXAMPLE_Z57000);
  protected userSettings = new FormGroup({
    scale: new FormControl<number>(1, { nonNullable: true }),
    orientation: new FormControl<'left' | 'right'>('right', { nonNullable: true }),
    view: new FormControl<'side' | 'top'>('side', { nonNullable: true }),
    vehicleImages: new FormControl<boolean>(true, { nonNullable: true }),
  });

  constructor() {
    this.topView = toSignal(
      this.userSettings.controls.view.valueChanges.pipe(map((view) => view === 'top')),
      { initialValue: this.userSettings.controls.view.value === 'top' }
    );

    this.leadingCabinRightSide = toSignal(
      this.userSettings.controls.orientation.valueChanges.pipe(
        map((orientation) => orientation === 'right')
      ),
      { initialValue: this.userSettings.controls.orientation.value === 'right' }
    );
  }
}
