import { OverlayContainer, FullscreenOverlayContainer } from '@angular/cdk/overlay';
import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats } from '@angular/material/core';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from '@angular/material/form-field';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Route, provideRouter } from '@angular/router';
import { HomeComponent } from '../pages/home.component';
import {
  MAT_LUXON_DATE_ADAPTER_OPTIONS,
  MAT_LUXON_DATE_FORMATS,
  MatLuxonDateAdapterOptions,
} from '@angular/material-luxon-adapter';
import { Settings } from 'luxon';
import { Table2DemoComponent } from '../components/table2-demo/table2-demo.component';
import { FormsDemoComponent } from '../components/forms-demo/forms-demo.component';
import { MatDatepickerIntl, MatDatepickerModule } from '@angular/material/datepicker';

function frenchRangeLabel(page: number, pageSize: number, length: number) {
  if (length == 0 || pageSize == 0) return `0 sur ${length}`;

  length = Math.max(length, 0);
  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex =
    startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

  return `${startIndex + 1} à ${endIndex} sur ${length}`;
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

function getFrenchDatePickerIntl() {
  const intl = new MatDatepickerIntl();

  intl.closeCalendarLabel = 'Fermer le calendrier';
  intl.changes.next();

  return intl;
}

const routes: Route[] = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'table2',
        component: Table2DemoComponent,
      },
      {
        path: 'forms',
        component: FormsDemoComponent,
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
    provideRouter(routes),
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
    // {
    //   provide: MatDatepickerModule,
    // },
    // {
    //   provide: MAT_DATE_FORMATS,
    //   useValue: <MatDateFormats>{
    //     ...MAT_LUXON_DATE_FORMATS,
    //     display: {
    //       ...MAT_LUXON_DATE_FORMATS.display,
    //       monthLabel: 'LLL yyyy',
    //     },
    //   },
    // },
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
