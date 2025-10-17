import { Routes } from '@angular/router';
import { ProductLayoutComponent } from './layouts/ProductLayout/ProductLayout.component';
import { ByProductPagesComponent } from './pages/by-product-pages/by-product-pages.component';
import { ProductPagesComponent } from './pages/product-pages/product-pages.component';

export const countryRoutes: Routes = [
  {
    path: '',
    component: ProductLayoutComponent,
    children: [
      {
        path: 'by-product',
        component: ByProductPagesComponent,
      },
      {
        path: 'by/:id',
        component: ProductPagesComponent,
      },
      {
        path: '**',
        redirectTo: 'by-product',
      },
    ],
  },
];

export default countryRoutes;
