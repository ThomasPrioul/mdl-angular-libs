import { ChangeDetectionStrategy, Component, HostBinding, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  VehicleImgRepoPipe,
  VehicleImgPipe,
  VehicleImgStylePipe,
  VehicleImageRepo,
} from '../../../pipes/vehicle-image.pipe';
import { ConsistModel, ConsistState } from '../../../models/met';
import { NgVarDirective } from '../../../directives/ng-var.directive';
import { ReversePipe } from '../../../pipes/reverse.pipe';
import { MatIconModule } from '@angular/material/icon';
import { VehicleComponent } from '../vehicle/vehicle.component';

@Component({
  selector: 'met-consist',
  standalone: true,
  templateUrl: './consist.component.html',
  styleUrls: ['./consist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatIconModule,
    NgVarDirective,
    ReversePipe,
    VehicleImgRepoPipe,
    VehicleImgPipe,
    VehicleImgStylePipe,
    VehicleComponent,
  ],
})
export class ConsistComponent {
  private _consist!: ConsistModel;
  private _consistData?: ConsistState;

  /** Whether the first cabin should display on the right side of the screen. */
  @Input() public rightToLeft: boolean = false;
  @Input() public scale: number = 1;
  /** Whether to use a top view instead of a side view (no images in top view, only outlines). */
  @Input() public topView: boolean = false;
  /** Whether to use images. If false, outlines are used. */
  @Input() public useVehicleImages: boolean = false;

  public imgRepo = signal<VehicleImageRepo | undefined>(undefined);

  /** Static consist information (vehicles, organs, etc). */
  @Input()
  public get consist(): ConsistModel {
    return this._consist;
  }

  /** Dynamic consist information (functional values for organs). */
  @Input()
  public get consistData(): ConsistState | undefined {
    return this._consistData;
  }

  public set consist(value: ConsistModel) {
    this._consist = value;
    this.imgRepo.set(new VehicleImgRepoPipe().transform(value));
  }

  public set consistData(value: ConsistState) {
    this._consistData = value;
  }

  // @HostBinding('style.font-size.em')
  // protected get textScale(): number {
  //   return 0.8 * this.scale;
  // }
  protected driverPresence(extremity: 'EXT1' | 'EXT2') {
    if (!this._consist || !this._consistData) return false;
    const index = extremity === 'EXT1' ? 0 : this._consist.vehicles.length - 1;
    const extVehicle = [...this._consist.vehicles].sort(
      (a, b) => a.coherencePosition - b.coherencePosition
    )[index];
    const extVehicleData = this._consistData.vehicleStates[extVehicle.numIntEf];
    return extVehicleData && extVehicleData.isExtremity && extVehicleData.inService;
  }
}
