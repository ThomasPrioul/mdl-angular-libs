import { OverlayContainer, FullscreenOverlayContainer } from '@angular/cdk/overlay';
import { APP_INITIALIZER, ApplicationConfig, Provider } from '@angular/core';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats } from '@angular/material/core';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from '@angular/material/form-field';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Route, provideRouter, withHashLocation } from '@angular/router';
import {
  MAT_LUXON_DATE_ADAPTER_OPTIONS,
  MAT_LUXON_DATE_FORMATS,
  MatLuxonDateAdapterOptions,
} from '@angular/material-luxon-adapter';
import { Settings } from 'luxon';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import { provideHttpClient } from '@angular/common/http';

function frenchRangeLabel(page: number, pageSize: number, length: number) {
  if (length == 0 || pageSize == 0) return `0 sur ${length}`;

  length = Math.max(length, 0);
  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex =
    startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

  return `${startIndex + 1} à ${endIndex} sur ${length}`;
}

function getFrenchDatePickerIntl() {
  const intl = new MatDatepickerIntl();

  intl.closeCalendarLabel = 'Fermer le calendrier';
  intl.changes.next();

  return intl;
}

function getFrenchPaginatorIntl() {
  const intl = new MatPaginatorIntl();

  intl.firstPageLabel = 'Première page';
  intl.lastPageLabel = 'Dernière page';
  intl.itemsPerPageLabel = 'Éléments par page :';
  intl.nextPageLabel = 'Page suivante';
  intl.previousPageLabel = 'Page précédente';
  intl.getRangeLabel = frenchRangeLabel;

  return intl;
}

export const DEFAULT_DATEFORMAT_PROVIDER: Provider = {
  provide: MAT_DATE_FORMATS,
  useValue: <MatDateFormats>{
    ...MAT_LUXON_DATE_FORMATS,
    display: {
      ...MAT_LUXON_DATE_FORMATS.display,
      monthLabel: 'LLL yyyy',
      dateInput: ['D', 'D T', 'D TT', 'D TT.SSS', 'D TT.SSSZ'],
    },
    parse: {
      ...MAT_LUXON_DATE_FORMATS.parse,
      dateInput: ['D TT.SSSZ', 'D TT.SSS', 'D TT', 'D T', 'D'],
    },
  },
};
const routes: Route[] = [
  {
    path: 'home',
    loadComponent: () => import('../pages/home.component').then((c) => c.HomeComponent),
    children: [
      {
        path: 'table2',
        loadComponent: () =>
          import('../components/table2-demo/table2-demo.component').then(
            (c) => c.Table2DemoComponent,
          ),
      },
      {
        path: 'forms',
        loadComponent: () =>
          import('../components/forms-demo/forms-demo.component').then((c) => c.FormsDemoComponent),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'table2',
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];
const setupLuxon = () => (Settings.defaultLocale = navigator.language);
export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideRouter(routes, withHashLocation()),
    {
      provide: APP_INITIALIZER,
      useValue: setupLuxon,
      multi: true,
    },
    { provide: OverlayContainer, useClass: FullscreenOverlayContainer },
    { provide: MAT_DATE_LOCALE, useValue: navigator.language },
    {
      provide: MAT_LUXON_DATE_ADAPTER_OPTIONS,
      useValue: <MatLuxonDateAdapterOptions>{ firstDayOfWeek: 1 },
    },
    { provide: MatPaginatorIntl, useValue: getFrenchPaginatorIntl() },
    { provide: MatDatepickerIntl, useValue: getFrenchDatePickerIntl() },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: <MatFormFieldDefaultOptions>{
        appearance: 'outline',
        color: 'primary',
        subscriptSizing: 'dynamic',
        floatLabel: 'always',
      },
    },
  ],
};
