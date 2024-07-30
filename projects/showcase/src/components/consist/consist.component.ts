import { ChangeDetectionStrategy, Component, HostBinding, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  VehicleImgRepoPipe,
  VehicleImgPipe,
  VehicleImgStylePipe,
  VehicleImageRepo,
} from '../../pipes/vehicle-image.pipe';
import { ConsistModel } from '../../models/met';
import { NgVarDirective } from '../../directives/ng-var.directive';
import { OrientationPipe } from '../../pipes/orientation.pipe';

@Component({
  selector: 'app-consist',
  standalone: true,
  templateUrl: './consist.component.html',
  styleUrls: ['./consist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    NgVarDirective,
    OrientationPipe,
    VehicleImgRepoPipe,
    VehicleImgPipe,
    VehicleImgStylePipe,
  ],
})
export class ConsistComponent {
  private _consist!: ConsistModel;

  @Input() public reversed: boolean = false;
  @Input() public scale: number = 1;

  public imgRepo = signal<VehicleImageRepo | undefined>(undefined);

  @Input()
  public get consist(): ConsistModel {
    return this._consist;
  }

  public set consist(value: ConsistModel) {
    this._consist = value;
    this.imgRepo.set(new VehicleImgRepoPipe().transform(value));
  }

  @HostBinding('style.font-size.em')
  protected get textScale(): number {
    return this.scale < 1.0 ? 0.8 * this.scale : 0.8;
  }

  protected get imgScale(): number {
    return Math.floor((1 / this.scale) * 100);
  }
}
