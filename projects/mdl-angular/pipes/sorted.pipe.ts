import { Pipe, PipeTransform } from '@angular/core';

/** Sorts a shallow copy of an array. */
@Pipe({
  name: 'sorted',
  standalone: true,
})
export class MdlSortedArrayPipe implements PipeTransform {
  public transform<T>(value: T[], compareFn?: ((a: T, b: T) => number) | undefined) {
    return [...value].sort(compareFn);
  }
}
