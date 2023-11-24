type NgClassType =
  | string
  | string[]
  | Set<string>
  | {
      [key: string]: any;
    }
  | undefined;

/** Normalizes ngClass return type to a string array. */
export function ngClassToArray(input: NgClassType): string[] {
  if (typeof input === "string") {
    return [input];
  } else if (Array.isArray(input)) {
    return input;
  } else if (input && input.size !== undefined) {
    return [...input.values];
  } else if (input) {
    return [...Object.keys(input)];
  }
  return [];
}
