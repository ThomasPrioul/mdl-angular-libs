import { TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MdlZoomButtonComponent } from './zoom-button.component';

function setup(inputs: Partial<{ zoomValue: number; minZoom: number; maxZoom: number; disabled: boolean }> = {}) {
  const fixture = TestBed.createComponent(MdlZoomButtonComponent);
  for (const [key, value] of Object.entries(inputs)) {
    fixture.componentRef.setInput(key, value);
  }
  fixture.detectChanges();
  return { fixture, component: fixture.componentInstance };
}

describe('MdlZoomButtonComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdlZoomButtonComponent],
      providers: [provideAnimationsAsync()],
    });
  });

  describe('getZoomValueString()', () => {
    it('formats 1 as "100 %"', () => {
      const { component } = setup({ zoomValue: 1 });
      expect(component.getZoomValueString()).toBe('100 %');
    });

    it('formats 1.5 as "150 %"', () => {
      const { component } = setup({ zoomValue: 1.5 });
      expect(component.getZoomValueString()).toBe('150 %');
    });

    it('formats 0.8 as "80 %"', () => {
      const { component } = setup({ zoomValue: 0.8 });
      expect(component.getZoomValueString()).toBe('80 %');
    });
  });

  describe('changeZoom()', () => {
    it('increases zoomValue by given amount', () => {
      const { component } = setup({ zoomValue: 1, maxZoom: 2 });
      (component as any).changeZoom(0.1);
      expect(component.zoomValue()).toBe(1.1);
    });

    it('clamps zoom at maxZoom', () => {
      const { component } = setup({ zoomValue: 2, maxZoom: 2 });
      (component as any).changeZoom(0.5);
      expect(component.zoomValue()).toBe(2);
    });

    it('clamps zoom at minZoom', () => {
      const { component } = setup({ zoomValue: 0.8, minZoom: 0.8 });
      (component as any).changeZoom(-0.5);
      expect(component.zoomValue()).toBe(0.8);
    });
  });

  describe('resetZoom()', () => {
    it('resets zoomValue to 1', () => {
      const { component } = setup({ zoomValue: 1.5 });
      (component as any).resetZoom();
      expect(component.zoomValue()).toBe(1);
    });
  });

  describe('ControlValueAccessor', () => {
    it('writeValue updates zoomValue signal', () => {
      const { component } = setup();
      component.writeValue(1.3);
      expect(component.zoomValue()).toBe(1.3);
    });

    it('setDisabledState updates disabled signal', () => {
      const { component } = setup();
      component.setDisabledState(true);
      expect(component.disabled()).toBe(true);
    });

    it('calls onChange callback when zoom changes', () => {
      const { component } = setup({ zoomValue: 1 });
      const onChange = vi.fn();
      component.registerOnChange(onChange);
      (component as any).changeZoom(0.1);
      expect(onChange).toHaveBeenCalledWith(1.1);
    });
  });
});
