import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'mdl-zoom-button',
  templateUrl: 'zoom-button.component.html',
  styleUrls: ['zoom-button.component.scss'],
  standalone: true,
  imports: [MatTooltipModule, MatIconModule, MatButtonModule],
})
export class MdlZoomButtonComponent {
  @Input() public maxZoom = 2;
  @Input() public minZoom = 0.8;

  @Input() public zoomValue: number = 1;
  @Output() public zoomValueChange = new EventEmitter<number>();

  public getZoomValueString() {
    return (this.zoomValue * 100).toFixed(0).toString() + ' %';
  }

  protected changeZoom(amount: number) {
    this.zoomValueChange.emit(
      (this.zoomValue = parseFloat(
        Math.min(Math.max(this.minZoom, this.zoomValue + amount), this.maxZoom).toFixed(1)
      ))
    );
  }

  protected resetZoom() {
    this.zoomValueChange.emit((this.zoomValue = 1));
  }
}
