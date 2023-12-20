import { FocusKeyManager } from '@angular/cdk/a11y';
import {
  AfterContentInit,
  Component,
  ContentChildren,
  HostListener,
  QueryList,
} from '@angular/core';
import { MdlDatePresetComponent } from './date-preset.component';

@Component({
  selector: 'mdl-date-presets',
  host: { role: 'list' },
  template: '<ng-content></ng-content>',
  standalone: true,
})
export class MdlDatePresets implements AfterContentInit {
  // FocusKeyManager instance
  private keyManager!: FocusKeyManager<MdlDatePresetComponent>;

  // 1. Query all child elements
  @ContentChildren(MdlDatePresetComponent) items!: QueryList<MdlDatePresetComponent>;

  public ngAfterContentInit() {
    // 2. Instantiate FocusKeyManager
    this.keyManager = new FocusKeyManager(this.items) // 3. Enabling wrapping
      .withWrap();
  }

  @HostListener('keydown', ['$event'])
  private onKeydown(event: KeyboardEvent) {
    this.keyManager.onKeydown(event);
  }
}
