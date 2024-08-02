import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, Signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MdlZoomButtonComponent } from 'mdl-angular/zoom-button';
import { ConsistComponent } from '../../components/met/consist/consist.component';
import { ConsistModel, TrainModel } from '../../models/met';
import { ReversePipe } from '../../pipes/reverse.pipe';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { EXAMPLE_UM4, EXAMPLE_Z50000, EXAMPLE_Z57000 } from '../../data/trains';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LuxonModule } from 'luxon-angular';
import { StationComponent } from '../../components/met/station/station.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { z } from 'zod';
import { FormGroupOf } from '../../helpers/form-group';

type SettingsModel = z.infer<typeof settingsModel>;

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
    MatExpansionModule,
    MatIconModule,
    MatSlideToggleModule,
    // Luxon
    LuxonModule,
    // MDL
    MdlZoomButtonComponent,
    // App
    ConsistComponent,
    ReversePipe,
    StationComponent,
  ],
})
export class DiagComponent {
  /** Dictionary, for each consist keyed by numEf, value is whether rightToLeft orientation should be applied. */
  protected readonly consistOrientations: Signal<Record<string, boolean>>;
  /** Whether the leading cabin is on the right side of the screen (right to left representation). */
  protected readonly leadingCabinRightSide: Signal<boolean>;
  protected readonly topView: Signal<boolean>;
  protected readonly train: Signal<TrainModel>;
  protected readonly userSettings: FormGroupOf<SettingsModel> = new FormGroup({
    example: new FormControl<'z50000' | 'z57000' | 'um4'>('z50000', { nonNullable: true }),
    vehicleIdPosition: new FormControl<'top' | 'bottom' | null>('bottom'),
    scale: new FormControl<number>(1, { nonNullable: true }),
    orientation: new FormControl<'left' | 'right'>('right', { nonNullable: true }),
    view: new FormControl<'side' | 'top'>('side', { nonNullable: true }),
    vehicleImages: new FormControl<boolean>(true, { nonNullable: true }),
    wrapConsists: new FormControl<boolean>(true, { nonNullable: true }),
  });
  protected readonly vehicleIdPosition: Signal<'top' | 'bottom' | null>;

  constructor() {
    try {
      const met_form = localStorage.getItem('met_form');
      if (met_form) {
        this.userSettings.reset(settingsModel.parse(JSON.parse(met_form)), { emitEvent: false });
      }
    } catch (error) {
      console.warn('Could not restore form data', error);
      localStorage.removeItem('met_form');
    }

    this.userSettings.valueChanges.subscribe(() =>
      localStorage.setItem('met_form', JSON.stringify(this.userSettings.getRawValue())),
    );

    this.topView = toSignal(
      this.userSettings.controls.view.valueChanges.pipe(map((view) => view === 'top')),
      { initialValue: this.userSettings.controls.view.value === 'top' },
    );

    this.train = toSignal(
      this.userSettings.controls.example.valueChanges.pipe(map((example) => examples[example])),
      { initialValue: examples[this.userSettings.controls.example.value] },
    );

    this.leadingCabinRightSide = toSignal(
      this.userSettings.controls.orientation.valueChanges.pipe(
        map((orientation) => orientation === 'right'),
      ),
      { initialValue: this.userSettings.controls.orientation.value === 'right' },
    );

    this.consistOrientations = computed(() => {
      const states = this.train().states;
      const reversed = this.leadingCabinRightSide();
      return Object.fromEntries(
        Object.keys(states).map((numEf) => [
          numEf,
          (states[numEf].orientation === 'reversed') != reversed,
        ]),
      );
    });

    this.vehicleIdPosition = toSignal(this.userSettings.controls.vehicleIdPosition.valueChanges, {
      initialValue: this.userSettings.controls.vehicleIdPosition.value,
    });
  }
}

const settingsModel = z.object({
  example: z.enum(['z50000', 'z57000', 'um4']),
  vehicleIdPosition: z.enum(['top', 'bottom']).nullable(),
  scale: z.number(),
  orientation: z.enum(['left', 'right']),
  view: z.enum(['side', 'top']),
  vehicleImages: z.boolean(),
  wrapConsists: z.boolean(),
});
const examples = {
  z50000: EXAMPLE_Z50000,
  z57000: EXAMPLE_Z57000,
  um4: EXAMPLE_UM4,
};
