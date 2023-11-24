import { MatOption } from '@angular/material/core';

export function skipDisabledOption(option: MatOption) {
  return option.disabled;
}
