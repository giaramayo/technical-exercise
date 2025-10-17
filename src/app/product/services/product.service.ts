import { computed, effect, Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { Product } from '../interfaces/rest-product.interface';
import { environment } from 'src/environments/environment.prod';

const PRODUCT_KEY = 'products';

const loadFromLocalStorage = (): Product[] => {
  const raw = localStorage.getItem(PRODUCT_KEY);
  return raw ? JSON.parse(raw) : [];
};

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);

  allProducts = signal<Product[]>(loadFromLocalStorage());
  filteredProducts = signal<Product[]>([]);

  saveProductsToLocalStorage = effect(() => {
    localStorage.setItem(PRODUCT_KEY, JSON.stringify(this.allProducts()));
  });

  searchProducto(): Observable<Product[]> {
    if (this.allProducts().length > 0) {
      return of(this.allProducts());
    }
    return this.http.get<Product[]>(`${environment.apiEcommerce}/products`).pipe(
      tap(products => {
        this.allProducts.set(products);
        this.filteredProducts.set(products);
      }),
      catchError(err => {
        console.error('Error al obtener productos', err);
        return of([]);
      })
    );
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${environment.apiEcommerce}/products/${id}`).pipe(
      tap(() => {
        this.allProducts.update(products => products.filter(p => p.id !== id));
        this.filteredProducts.update(products => products.filter(p => p.id !== id));
      }),
      catchError(err => {
        console.error('Error al eliminar producto', err);
        return throwError(() => err);
      })
    );
  }

  getProduct(id: number): Observable<Product | undefined> {
    const product = this.allProducts().find(p => p.id === id);
    if (product) return of(product);

    return this.http.get<Product>(`${environment.apiEcommerce}/products/${id}`);
  }

  filterProducts(query: string) {
    const term = query.toLowerCase().trim();
    if (!term) {
      this.filteredProducts.set(this.allProducts());
      return;
    }

    this.filteredProducts.set(
      this.allProducts().filter(p =>
        p.title.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
      )
    );
  }
}
