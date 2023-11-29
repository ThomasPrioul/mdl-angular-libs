import { Pipe, PipeTransform } from '@angular/core';

/** Casts any typed variable to strongly typed variable. Useful in material row definitions. */
@Pipe({
  name: 'cast',
  pure: true,
  standalone: true,
})
export class MdlCastPipe implements PipeTransform {
  public transform<T>(value: any, _type: (new (...args: any[]) => T) | T): T {
    return value as T;
  }
}
