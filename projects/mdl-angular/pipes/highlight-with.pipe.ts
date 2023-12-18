import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightWith',
  standalone: true,
})
export class MdlHighlightWithPipe implements PipeTransform {
  public transform(value?: string | number, filter?: string, klass?: string) {
    if (!value) return value;
    if (typeof value === 'number') value = value.toString();
    if (!filter || typeof value !== 'string' || typeof filter !== 'string') {
      return value;
    }

    const searchResults = filter.match(/(?:[^\s"]+|"[^"]*")+/g);
    if (!searchResults) return value;

    const curatedTokens = [...new Set(searchResults)]
      .map((token) => escapeRegExp(token.replaceAll('"', '').replaceAll("'", '')))
      .join('|');
    return value.replaceAll(
      new RegExp(curatedTokens, 'gi'),
      (match) => `<span class="${klass ?? 'highlight'}">${match}</span>`
    );
  }
}

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
