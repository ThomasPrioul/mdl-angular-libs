import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
  standalone: true,
})
export class ReversePipe implements PipeTransform {
  public transform<T>(items: T[], reversed: boolean) {
    return reversed ? [...items].reverse() : items;
  }
}
