import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MdlSpinnerComponent } from './spinner.component';

describe('MdlSpinnerComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [MdlSpinnerComponent] });
  });

  it('has default signal values (mode=border, diameter=32, strokeWidth=8, overlay=false)', () => {
    const fixture = TestBed.createComponent(MdlSpinnerComponent);
    fixture.detectChanges();
    const c = fixture.componentInstance;
    expect(c.mode()).toBe('border');
    expect(c.diameter()).toBe(32);
    expect(c.strokeWidth()).toBe(8);
    expect(c.overlay()).toBe(false);
  });

  it('setting overlay=true makes effectiveDiameter=28 and effectiveStrokeWidth=9', () => {
    const fixture = TestBed.createComponent(MdlSpinnerComponent);
    fixture.componentRef.setInput('overlay', true);
    fixture.detectChanges();
    const c = fixture.componentInstance as any;
    expect(c.effectiveDiameter()).toBe(28);
    expect(c.effectiveStrokeWidth()).toBe(9);
    expect(fixture.componentInstance.overlay()).toBe(true);
  });

  it('effectiveDiameter uses diameter input when overlay=false', () => {
    const fixture = TestBed.createComponent(MdlSpinnerComponent);
    fixture.componentRef.setInput('diameter', 64);
    fixture.detectChanges();
    expect((fixture.componentInstance as any).effectiveDiameter()).toBe(64);
  });

  it('coerces overlay from string "true" via booleanAttribute', () => {
    const fixture = TestBed.createComponent(MdlSpinnerComponent);
    fixture.componentRef.setInput('overlay', '' as any); // presence = true
    fixture.detectChanges();
    expect(fixture.componentInstance.overlay()).toBe(true);
  });

  it('coerces diameter from string via numberAttribute', () => {
    const fixture = TestBed.createComponent(MdlSpinnerComponent);
    fixture.componentRef.setInput('diameter', '48' as any);
    fixture.detectChanges();
    expect(fixture.componentInstance.diameter()).toBe(48);
  });

  it('coerces strokeWidth from string via numberAttribute', () => {
    const fixture = TestBed.createComponent(MdlSpinnerComponent);
    fixture.componentRef.setInput('strokeWidth', '12' as any);
    fixture.detectChanges();
    expect(fixture.componentInstance.strokeWidth()).toBe(12);
  });

  it('adds overlay-spinner class to host when overlay=true', () => {
    const fixture = TestBed.createComponent(MdlSpinnerComponent);
    fixture.componentRef.setInput('overlay', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.classList).toContain('overlay-spinner');
  });

  it('does not add overlay-spinner class when overlay=false', () => {
    const fixture = TestBed.createComponent(MdlSpinnerComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.classList).not.toContain('overlay-spinner');
  });

  it('binds width and height to effectiveDiameter via host binding', () => {
    const fixture = TestBed.createComponent(MdlSpinnerComponent);
    fixture.componentRef.setInput('diameter', 64);
    fixture.detectChanges();
    expect(fixture.nativeElement.style.width).toBe('64px');
    expect(fixture.nativeElement.style.height).toBe('64px');
  });

  it('renders SVG with the two circles', () => {
    const fixture = TestBed.createComponent(MdlSpinnerComponent);
    fixture.detectChanges();
    const circles = fixture.debugElement.queryAll(By.css('circle'));
    expect(circles.length).toBe(2);
  });
});
