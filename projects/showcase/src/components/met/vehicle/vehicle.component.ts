import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  VehicleImageRepo,
  VehicleImgPipe,
  VehicleImgStylePipe,
} from '../../../pipes/vehicle-image.pipe';
import { ConsistModel, VehicleModel } from 'projects/showcase/src/models/met';

/** Represents a single vehicle drawing, can be an image or an outlined drawing depending on available info. */
@Component({
  selector: 'met-vehicle',
  standalone: true,
  imports: [CommonModule, VehicleImgPipe, VehicleImgStylePipe],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleComponent {
  private _scale: number = 1;

  protected imgScale: number = 100;

  /** Static consist information (vehicles, organs, etc). */
  @Input() public consist!: ConsistModel;
  /** Image repository. */
  @Input() public imgRepo?: VehicleImageRepo;
  @Input() public position?: 'first' | 'last';
  /** Whether the first cabin should display on the right side of the screen. */
  @Input() public rightToLeft: boolean = false;
  /** Whether to use a top view instead of a side view (no images in top view, only outlines). */
  @Input() public topView: boolean = false;
  /** Whether to use images. If false, outlines are used. */
  @Input() public useImages: boolean = false;
  /** Vehicle static data. */
  @Input() public vehicle!: VehicleModel;

  @Input()
  public get scale(): number {
    return this._scale;
  }

  public set scale(value: number) {
    this._scale = value;
    this.imgScale = Math.floor((1 / this.scale) * 100);
  }
}
