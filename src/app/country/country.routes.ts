import { Routes } from '@angular/router';
import { CountryLayoutComponent } from './layouts/CountryLayout/CountryLayout.component';
import { ByCapitalPageComponent } from './pages/ by-capital-page/ by-capital-page.component';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';

export const countryRoutes: Routes = [
  {
    path: '',
    component: CountryLayoutComponent,
    children: [
      {
        path: 'by-capital', // Por capital
        component: ByCapitalPageComponent,
      },
      {
        path: 'by-country', // Por país
        component: ByCountryPageComponent,
      },
      {
        path: 'by-region',  // Por región
        component: ByRegionPageComponent,
      },

      {
        path: 'by/:code', // Detalle del país
        component: CountryPageComponent,
      },

      {
        path: '**',
        redirectTo: 'by-region',
      },
    ],
  },
];

export default countryRoutes;
