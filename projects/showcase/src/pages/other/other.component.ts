import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-other',
  standalone: true,
  imports: [],
  templateUrl: './other.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtherComponent { }
