import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../interfaces/rest-product.interface';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';

const API_URL = 'https://fakestoreapi.com';

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
