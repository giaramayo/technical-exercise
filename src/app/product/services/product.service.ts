import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../interfaces/rest-product.interface';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

const API_URL = environment.apiEcommerce;

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private http = inject(HttpClient);

  searchProducto(): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_URL}/products`).pipe(
      tap(products => console.log('Productos:', products)));
  }


}
