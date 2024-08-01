import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { registerMaterialIcons } from 'mdl-angular';

@Component({
  selector: 'met-station',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './station.component.html',
  styleUrl: './station.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationComponent {
  private static _iconInitialized = false;

  @Input() public station: string | null = null;

  constructor() {
    if (!StationComponent._iconInitialized) {
      registerMaterialIcons({
        sncf_station: '/assets/station.svg',
      });
      StationComponent._iconInitialized = true;
    }
  }
}
