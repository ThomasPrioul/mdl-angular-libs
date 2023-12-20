import { InjectionToken } from '@angular/core';
import { DateAdapter } from '@angular/material/core';

export const DATE_RANGE_PRESETS = new InjectionToken<DateRangePreset<any>[]>(
  'date-range-input.presets'
);

interface Range<D> {
  end: D;
  start: D;
}

export type DateRangePresetFunc<D> = (dateAdapter: DateAdapter<D>) => Range<D>;

export interface DateRangePreset<D> {
  calculateDateRange: DateRangePresetFunc<D>;
  name: string;
}

export function dayBefore<D>(dateAdapter: DateAdapter<D>, forDay: D) {
  const dayBefore = dateAdapter.addCalendarDays(forDay, -1);
  return {
    start: dayBefore,
    end: dayBefore,
  };
}

export function calculateMonth<D>(dateAdapter: DateAdapter<D>, forDay: D) {
  const year = dateAdapter.getYear(forDay);
  const month = dateAdapter.getMonth(forDay);
  const start = dateAdapter.createDate(year, month, 1);
  const end = dateAdapter.addCalendarDays(start, dateAdapter.getNumDaysInMonth(forDay) - 1);
  return { start: start, end: end };
}

export function calculateWeek<D>(dateAdapter: DateAdapter<D>, forDay: D) {
  const deltaStart = dateAdapter.getFirstDayOfWeek() - dateAdapter.getDayOfWeek(forDay);
  const start = dateAdapter.addCalendarDays(forDay, deltaStart);
  const end = dateAdapter.addCalendarDays(start, 6);
  return { start: start, end: end };
}
