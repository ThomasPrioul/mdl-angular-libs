import { TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MdlTimePickerComponent } from './time-picker.component';

function setup() {
  const fixture = TestBed.createComponent(MdlTimePickerComponent);
  const component = fixture.componentInstance;
  fixture.detectChanges();
  return { fixture, component };
}

describe('MdlTimePickerComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdlTimePickerComponent],
      providers: [provideAnimationsAsync()],
    });
  });

  describe('ControlValueAccessor', () => {
    it('writeValue("10:30:00") parses hours, minutes, seconds', () => {
      const { component } = setup();
      component.writeValue('10:30:00');
      expect((component as any).time.value).toEqual({ hours: '10', minutes: '30', seconds: '00' });
      expect(component.selectedTime).toBe('10:30:00');
    });

    it('writeValue(null) resets selectedTime and form to null', () => {
      const { component } = setup();
      component.writeValue('10:30:00');
      component.writeValue(null);
      expect(component.selectedTime).toBeNull();
      expect((component as any).time.value).toEqual({ hours: null, minutes: null, seconds: null });
    });

    it('writeValue with missing tokens fills nulls', () => {
      const { component } = setup();
      component.writeValue('09:15');
      expect((component as any).time.value.hours).toBe('09');
      expect((component as any).time.value.minutes).toBe('15');
      expect((component as any).time.value.seconds).toBeNull();
    });

    it('registerOnChange stores the callback', () => {
      const { component } = setup();
      const fn = vi.fn();
      component.registerOnChange(fn);
      component.selectTime('08:00:00');
      expect(fn).toHaveBeenCalledWith('08:00:00');
    });

    it('registerOnTouched stores the callback', () => {
      const { component } = setup();
      const fn = vi.fn();
      component.registerOnTouched(fn);
      component.onTouched();
      expect(fn).toHaveBeenCalled();
    });
  });

  describe('selectTime()', () => {
    it('sets selectedTime', () => {
      const { component } = setup();
      component.selectTime('14:45:30');
      expect(component.selectedTime).toBe('14:45:30');
    });

    it('calls onChange with the time value', () => {
      const { component } = setup();
      const fn = vi.fn();
      component.registerOnChange(fn);
      component.selectTime('14:45:30');
      expect(fn).toHaveBeenCalledWith('14:45:30');
    });

    it('accepts null to clear selection', () => {
      const { component } = setup();
      component.selectTime('10:00:00');
      component.selectTime(null);
      expect(component.selectedTime).toBeNull();
    });
  });

  describe('submit()', () => {
    it('builds time string from form values and closes overlay', () => {
      const { component } = setup();
      component.writeValue('09:15:30');
      component.overlayOpen = true;
      const fn = vi.fn();
      component.registerOnChange(fn);
      component.submit(null as any, null as any, null as any);
      expect(component.selectedTime).toBe('09:15:30');
      expect(component.overlayOpen).toBe(false);
      expect(fn).toHaveBeenCalledWith('09:15:30');
    });
  });

  describe('overlayOpen', () => {
    it('defaults to false', () => {
      const { component } = setup();
      expect(component.overlayOpen).toBe(false);
    });

    it('can be set to true', () => {
      const { component } = setup();
      component.overlayOpen = true;
      expect(component.overlayOpen).toBe(true);
    });
  });
});
