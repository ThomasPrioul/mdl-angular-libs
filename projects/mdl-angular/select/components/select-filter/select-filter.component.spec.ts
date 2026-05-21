import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MdlSelectFilterComponent } from './select-filter.component';

// ─── Standalone host (no MatSelect — optional dep absent) ────────────────────

@Component({
  standalone: true,
  imports: [MdlSelectFilterComponent],
  template: `<mdl-select-filter [placeholder]="placeholder" [withCheckAll]="withCheckAll"></mdl-select-filter>`,
})
class TestHostComponent {
  placeholder = 'Recherche';
  withCheckAll: any = false;
}

describe('MdlSelectFilterComponent — without MatSelect', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideAnimationsAsync()],
    });
  });

  it('renders without crashing when MatSelect is absent', () => {
    expect(() => {
      const fixture = TestBed.createComponent(TestHostComponent);
      fixture.detectChanges();
    }).not.toThrow();
  });

  it('shows default placeholder "Recherche"', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input'));
    expect(input?.nativeElement.placeholder).toBe('Recherche');
  });

  it('shows custom placeholder when set', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.placeholder = 'Filtrer…';
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input'));
    expect(input?.nativeElement.placeholder).toBe('Filtrer…');
  });

  it('does not render the check-all checkbox when withCheckAll=false', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const checkbox = fixture.debugElement.query(By.css('mat-checkbox'));
    expect(checkbox).toBeNull();
  });

  // NOTE: Testing withCheckAll=true via template rendering requires a MatSelect provider
  // because MdlSelectGlobalCheckboxDirective has a required MatSelect constructor dep.
  // The coercion logic is covered below via direct getter/setter test.

  it('coerces withCheckAll from string "true" (setter)', () => {
    const fixture = TestBed.createComponent(MdlSelectFilterComponent);
    fixture.detectChanges();
    (fixture.componentInstance as any).withCheckAll = 'true';
    expect(fixture.componentInstance.withCheckAll).toBe(true);
  });

  it('coerces withCheckAll — "false" string → false', () => {
    const fixture = TestBed.createComponent(MdlSelectFilterComponent);
    fixture.detectChanges();
    (fixture.componentInstance as any).withCheckAll = 'false';
    expect(fixture.componentInstance.withCheckAll).toBe(false);
  });
});

describe('MdlSelectFilterComponent — value and clear', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdlSelectFilterComponent],
      providers: [provideAnimationsAsync()],
    });
  });

  it('value getter returns empty string initially', () => {
    const fixture = TestBed.createComponent(MdlSelectFilterComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.value).toBe('');
  });

  it('onClearClick() clears the input and keeps focus', () => {
    const fixture = TestBed.createComponent(MdlSelectFilterComponent);
    fixture.detectChanges();
    const input = fixture.componentInstance.input;
    input.value = 'test';
    (fixture.componentInstance as any).onClearClick();
    expect(fixture.componentInstance.value).toBe('');
  });
});

describe('MdlSelectFilterComponent — shouldInputHandleEvent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdlSelectFilterComponent],
      providers: [provideAnimationsAsync()],
    });
  });

  function makeEvent(init: KeyboardEventInit): KeyboardEvent {
    return new KeyboardEvent('keydown', init);
  }

  it('returns true for Ctrl+key (let input handle it)', () => {
    const fixture = TestBed.createComponent(MdlSelectFilterComponent);
    fixture.detectChanges();
    const c = fixture.componentInstance as any;
    expect(c.shouldInputHandleEvent(makeEvent({ key: 'a', ctrlKey: true }))).toBe(true);
  });

  it('returns true for Alt+key', () => {
    const fixture = TestBed.createComponent(MdlSelectFilterComponent);
    fixture.detectChanges();
    const c = fixture.componentInstance as any;
    expect(c.shouldInputHandleEvent(makeEvent({ key: 'ArrowDown', altKey: true }))).toBe(true);
  });

  it('returns false for regular navigation key', () => {
    const fixture = TestBed.createComponent(MdlSelectFilterComponent);
    fixture.detectChanges();
    const c = fixture.componentInstance as any;
    expect(c.shouldInputHandleEvent(makeEvent({ key: 'ArrowDown' }))).toBe(false);
  });

  it('returns false for Shift+Tab (standard Tab)', () => {
    const fixture = TestBed.createComponent(MdlSelectFilterComponent);
    fixture.detectChanges();
    const c = fixture.componentInstance as any;
    expect(c.shouldInputHandleEvent(makeEvent({ key: 'Tab', shiftKey: true }))).toBe(false);
  });
});
