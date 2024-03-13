import { ChangeDetectionStrategy, Component, HostBinding, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  VehicleImgRepoPipe,
  VehicleImgPipe,
  VehicleImgStylePipe,
  VehicleImageRepo,
} from '../../pipes/vehicle-image.pipe';
import { ConsistModel, ConsistState } from '../../models/met';
import { NgVarDirective } from '../../directives/ng-var.directive';
import { OrientationPipe } from '../../pipes/orientation.pipe';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-consist',
  standalone: true,
  templateUrl: './consist.component.html',
  styleUrls: ['./consist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatIconModule,
    NgVarDirective,
    OrientationPipe,
    VehicleImgRepoPipe,
    VehicleImgPipe,
    VehicleImgStylePipe,
  ],
})
export class ConsistComponent {
  private _consist!: ConsistModel;
  private _consistData?: ConsistState;

  @Input() public reversed: boolean = false;
  @Input() public scale: number = 1;

  public imgRepo = signal<VehicleImageRepo | undefined>(undefined);

  @Input()
  public get consist(): ConsistModel {
    return this._consist;
  }

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

  @HostBinding('style.font-size.em')
  protected get textScale(): number {
    return 0.8 * this.scale;
  }

  protected get imgScale(): number {
    return Math.floor((1 / this.scale) * 100);
  }

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
