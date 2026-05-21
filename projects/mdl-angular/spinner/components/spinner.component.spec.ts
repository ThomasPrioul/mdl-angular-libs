import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MdlSpinnerComponent } from './spinner.component';

describe('MdlSpinnerComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [MdlSpinnerComponent] });
  });

  it('has default values (mode=border, diameter=32, strokeWidth=8, overlay=false)', () => {
    const fixture = TestBed.createComponent(MdlSpinnerComponent);
    const c = fixture.componentInstance;
    expect(c.mode).toBe('border');
    expect(c.diameter).toBe(32);
    expect(c.strokeWidth).toBe(8);
    expect(c.overlay).toBe(false);
  });

  it('setting overlay=true forces diameter=28 and strokeWidth=9', () => {
    const fixture = TestBed.createComponent(MdlSpinnerComponent);
    const c = fixture.componentInstance;
    c.overlay = true;
    expect(c.diameter).toBe(28);
    expect(c.strokeWidth).toBe(9);
    expect(c.overlay).toBe(true);
  });

  it('coerces overlay from string "true"', () => {
    const fixture = TestBed.createComponent(MdlSpinnerComponent);
    const c = fixture.componentInstance;
    (c as any).overlay = 'true';
    expect(c.overlay).toBe(true);
  });

  it('coerces diameter from string', () => {
    const fixture = TestBed.createComponent(MdlSpinnerComponent);
    const c = fixture.componentInstance;
    (c as any).diameter = '48';
    expect(c.diameter).toBe(48);
  });

  it('coerces strokeWidth from string', () => {
    const fixture = TestBed.createComponent(MdlSpinnerComponent);
    const c = fixture.componentInstance;
    (c as any).strokeWidth = '12';
    expect(c.strokeWidth).toBe(12);
  });

  it('adds overlay-spinner class to host when overlay=true', () => {
    const fixture = TestBed.createComponent(MdlSpinnerComponent);
    fixture.componentInstance.overlay = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.classList).toContain('overlay-spinner');
  });

  it('does not add overlay-spinner class when overlay=false', () => {
    const fixture = TestBed.createComponent(MdlSpinnerComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.classList).not.toContain('overlay-spinner');
  });

  it('binds width and height to diameter via HostBinding', () => {
    const fixture = TestBed.createComponent(MdlSpinnerComponent);
    fixture.componentInstance.diameter = 64;
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
