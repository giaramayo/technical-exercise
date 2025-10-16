import { Component, inject, linkedSignal, signal, WritableSignal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Product } from '../../interfaces/rest-product.interface';
import { catchError, map, of, tap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ProductsGridComponent } from "../../components/products-grid/products-grid.component";
import { ToastModule, Toast } from 'primeng/toast';
import { ProductsListComponent } from "../../components/products-list/products-list.component";
import { OptionViewComponent } from '../../components/option-view/option-view.component';
import { SearchInputComponent } from "../../../shared/components/search-input/search-input.component";
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";

@Component({
  selector: 'by-product-pages',
  templateUrl: './by-product-pages.component.html',
  providers: [ProductService, MessageService, ToastModule],
  imports: [ProductsGridComponent, Toast, ProductsListComponent, OptionViewComponent, SearchInputComponent, NotFoundComponent],
})
export class ByProductPagesComponent {

  private productService = inject(ProductService);
  private messageService = inject(MessageService);

  selectedList: WritableSignal<boolean> = signal(true);

  allProducts: WritableSignal<Product[]> = signal([]);
  filteredProducts: WritableSignal<Product[]> = signal([]);

  productResource = rxResource<Product[], string>({
    stream: () => {
      return this.productService.searchProducto().pipe(
        map(products =>
          products.map(p => ({
            ...p,
            name: p.title,
            ratingValue: p.rating?.rate ?? 0
          }))
        ),
        tap(products => {
          this.allProducts.set(products);
          this.filteredProducts.set(products);
        }),
        catchError(err => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al consultar Productos',
            detail: err?.message ?? 'No se pudieron obtener productos',
            life: 4000,
          });
          return of([]);
        })
      );
    },
    defaultValue: [],
  });

  filterProducts(query: string) {
    const term = query.toLowerCase().trim();
    if (!term) {
      this.filteredProducts.set(this.allProducts());
      return;
    }

    const filtered = this.allProducts().filter(p =>
      p.title.toLowerCase().includes(term) || p.category.toLowerCase().includes(term)
    );

    this.filteredProducts.set(filtered);
  }


}
