import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'country',
    loadChildren: () => import('./country/country.routes'),
  },
  {
    path: 'product',
    loadChildren: () => import('./product/product.routes'),
  },
  {
    path: '**',
    redirectTo: 'country',
  },
];
