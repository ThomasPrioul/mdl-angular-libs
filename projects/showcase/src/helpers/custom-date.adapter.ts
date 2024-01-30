import { Injectable } from '@angular/core';
import { LuxonDateAdapter } from '@angular/material-luxon-adapter';
import { DateTime } from 'luxon';

@Injectable()
export class DemoDateAdapter extends LuxonDateAdapter {
  public override format(date: DateTime<boolean>, displayFormat: string | string[]): string {
    if (Array.isArray(displayFormat)) {
      for (let currentFormat of displayFormat) {
        const formattedDate = super.format(date, currentFormat);
        const reparsedDate = DateTime.fromFormat(formattedDate, currentFormat, { locale: 'fr-FR' });
        if (+date - +reparsedDate === 0) {
          return formattedDate;
        }
      }
    } else {
      return super.format(date, displayFormat);
    }

    return date.toISO()!;
  }
}
