import { ngClassToArray } from './ngclass';
import { skipDisabledOption } from './skip-disabled-option';
import { MatOption } from '@angular/material/core';

describe('ngClassToArray', () => {
  it('wraps a string in an array', () => {
    expect(ngClassToArray('foo')).toEqual(['foo']);
  });

  it('returns an array as-is', () => {
    expect(ngClassToArray(['a', 'b'])).toEqual(['a', 'b']);
  });

  it('converts an object to its keys', () => {
    expect(ngClassToArray({ active: true, disabled: false })).toEqual(['active', 'disabled']);
  });

  it('returns [] for undefined', () => {
    expect(ngClassToArray(undefined)).toEqual([]);
  });

  it('returns [] for empty object', () => {
    expect(ngClassToArray({})).toEqual([]);
  });

  it('returns [] for empty array', () => {
    expect(ngClassToArray([])).toEqual([]);
  });

  it('wraps empty string in array (consistent with string branch)', () => {
    expect(ngClassToArray('')).toEqual(['']);
  });
});

describe('skipDisabledOption', () => {
  function mockOption(disabled: boolean): MatOption {
    return { disabled } as MatOption;
  }

  it('returns true for a disabled option', () => {
    expect(skipDisabledOption(mockOption(true))).toBe(true);
  });

  it('returns false for an enabled option', () => {
    expect(skipDisabledOption(mockOption(false))).toBe(false);
  });
});
