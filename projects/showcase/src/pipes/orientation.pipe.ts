import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orientation',
  standalone: true,
})
export class OrientationPipe implements PipeTransform {
  public transform<T>(items: T[], reversed: boolean) {
    return reversed ? [...items].reverse() : items;
  }
}
