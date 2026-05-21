import { TestBed } from '@angular/core/testing';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';
import { dayBefore, calculateMonth, calculateWeek } from './utilities';

describe('DatePicker utilities', () => {
  let adapter: DateAdapter<Date>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: DateAdapter, useClass: NativeDateAdapter }],
    });
    adapter = TestBed.inject(DateAdapter);
  });

  describe('dayBefore()', () => {
    it('returns the day before the given date', () => {
      const today = new Date(2024, 0, 15); // Jan 15
      const result = dayBefore(adapter, today);
      expect(adapter.getDate(result.start)).toBe(14);
      expect(adapter.getMonth(result.start)).toBe(0);
    });

    it('start === end (single day range)', () => {
      const today = new Date(2024, 5, 10);
      const { start, end } = dayBefore(adapter, today);
      expect(adapter.sameDate(start, end)).toBe(true);
    });

    it('crosses month boundary correctly', () => {
      const firstOfMonth = new Date(2024, 2, 1); // Mar 1
      const result = dayBefore(adapter, firstOfMonth);
      expect(adapter.getMonth(result.start)).toBe(1); // February
      expect(adapter.getDate(result.start)).toBe(29); // 2024 is leap year
    });
  });

  describe('calculateMonth()', () => {
    it('start is first day of the month', () => {
      const date = new Date(2024, 3, 15); // April 15
      const result = calculateMonth(adapter, date);
      expect(adapter.getDate(result.start)).toBe(1);
      expect(adapter.getMonth(result.start)).toBe(3);
    });

    it('end is last day of the month', () => {
      const date = new Date(2024, 3, 1); // April — 30 days
      const result = calculateMonth(adapter, date);
      expect(adapter.getDate(result.end)).toBe(30);
      expect(adapter.getMonth(result.end)).toBe(3);
    });

    it('handles February in a leap year', () => {
      const date = new Date(2024, 1, 10); // Feb 2024 (leap)
      const result = calculateMonth(adapter, date);
      expect(adapter.getDate(result.end)).toBe(29);
    });

    it('handles February in a non-leap year', () => {
      const date = new Date(2023, 1, 1); // Feb 2023
      const result = calculateMonth(adapter, date);
      expect(adapter.getDate(result.end)).toBe(28);
    });
  });

  describe('calculateWeek()', () => {
    it('returns a 7-day range', () => {
      const date = new Date(2024, 0, 10); // Wednesday Jan 10
      const { start, end } = calculateWeek(adapter, date);
      const diff = adapter.compareDate(end, start);
      expect(diff).toBe(6);
    });

    it('start is the first day of the week', () => {
      // NativeDateAdapter default first day of week = Sunday (0)
      const wednesday = new Date(2024, 0, 10); // Wednesday
      const { start } = calculateWeek(adapter, wednesday);
      expect(adapter.getDayOfWeek(start)).toBe(adapter.getFirstDayOfWeek());
    });

    it('end is 6 days after start', () => {
      const date = new Date(2024, 0, 15);
      const { start, end } = calculateWeek(adapter, date);
      const startPlus6 = adapter.addCalendarDays(start, 6);
      expect(adapter.sameDate(end, startPlus6)).toBe(true);
    });
  });
});
