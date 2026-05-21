import { MdlHighlightWithPipe } from './highlight-with.pipe';
import { MdlSortedArrayPipe } from './sorted.pipe';
import { MdlCastPipe } from './cast.pipe';

// ─── MdlHighlightWithPipe ────────────────────────────────────────────────────

describe('MdlHighlightWithPipe', () => {
  const pipe = new MdlHighlightWithPipe();

  it('returns undefined when value is falsy', () => {
    expect(pipe.transform(undefined, 'foo')).toBeUndefined();
  });

  it('returns value unchanged when filter is empty', () => {
    expect(pipe.transform('hello world', '')).toBe('hello world');
  });

  it('returns value unchanged when filter is undefined', () => {
    expect(pipe.transform('hello world', undefined)).toBe('hello world');
  });

  it('wraps matching text in default .highlight span', () => {
    const result = pipe.transform('hello world', 'world');
    expect(result).toBe('hello <span class="highlight">world</span>');
  });

  it('wraps matching text in custom class span', () => {
    const result = pipe.transform('hello world', 'hello', 'my-class');
    expect(result).toBe('<span class="my-class">hello</span> world');
  });

  it('is case-insensitive', () => {
    const result = pipe.transform('Hello World', 'hello');
    expect(result).toBe('<span class="highlight">Hello</span> World');
  });

  it('highlights multiple distinct tokens from space-separated filter', () => {
    const result = pipe.transform('foo bar baz', 'foo baz');
    expect(result).toContain('<span class="highlight">foo</span>');
    expect(result).toContain('<span class="highlight">baz</span>');
  });

  it('converts number to string before highlighting', () => {
    const result = pipe.transform(42, '4');
    expect(result).toBe('<span class="highlight">4</span>2');
  });

  it('handles quoted tokens as single phrases', () => {
    const result = pipe.transform('hello world foo', '"hello world"');
    expect(result).toBe('<span class="highlight">hello world</span> foo');
  });

  it('escapes regex special characters in filter', () => {
    const result = pipe.transform('price: $5.00', '$5.00');
    expect(result).toBe('price: <span class="highlight">$5.00</span>');
  });
});

// ─── MdlSortedArrayPipe ──────────────────────────────────────────────────────

describe('MdlSortedArrayPipe', () => {
  const pipe = new MdlSortedArrayPipe();

  it('sorts numbers in ascending order by default', () => {
    expect(pipe.transform([3, 1, 2])).toEqual([1, 2, 3]);
  });

  it('returns a new array (does not mutate original)', () => {
    const original = [3, 1, 2];
    const result = pipe.transform(original);
    expect(result).not.toBe(original);
    expect(original).toEqual([3, 1, 2]);
  });

  it('uses custom compareFn when provided', () => {
    const desc = (a: number, b: number) => b - a;
    expect(pipe.transform([3, 1, 2], desc)).toEqual([3, 2, 1]);
  });

  it('handles empty array', () => {
    expect(pipe.transform([])).toEqual([]);
  });

  it('sorts strings lexicographically by default', () => {
    expect(pipe.transform(['banana', 'apple', 'cherry'])).toEqual([
      'apple',
      'banana',
      'cherry',
    ]);
  });
});

// ─── MdlCastPipe ─────────────────────────────────────────────────────────────

describe('MdlCastPipe', () => {
  const pipe = new MdlCastPipe();

  it('returns the value as-is (identity cast)', () => {
    const obj = { id: 1, name: 'test' };
    expect(pipe.transform(obj, Object)).toBe(obj);
  });

  it('passes through null', () => {
    expect(pipe.transform(null, String)).toBeNull();
  });

  it('passes through a number without modification', () => {
    expect(pipe.transform(42, Number)).toBe(42);
  });
});
