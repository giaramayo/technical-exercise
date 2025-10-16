import { Routes } from '@angular/router';
import { ProductLayoutComponent } from './layouts/ProductLayout/ProductLayout.component';
import { ByProductPagesComponent } from './pages/by-product-pages/by-product-pages.component';

export const countryRoutes: Routes = [
  {
    path: '',
    component: ProductLayoutComponent,
    children: [
      {
        path: 'by-product', // Por capital
        component: ByProductPagesComponent,
      },
    //   {
    //     path: 'by-country', // Por país
    //     component: ByCountryPageComponent,
    //   },
    //   {
    //     path: 'by-region',  // Por región
    //     component: ByRegionPageComponent,
    //   },

    //   {
    //     path: 'by/:code', // Detalle del país
    //     component: CountryPageComponent,
    //   },

      {
        path: '**',
        redirectTo: 'by-product',
      },
    ],
  },
];

export default countryRoutes;
