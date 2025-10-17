import { Component, inject, WritableSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/rest-product.interface';
import { MessageService } from 'primeng/api';
import { catchError, map, of, tap } from 'rxjs';

import { ProductsGridComponent } from "../../components/products-grid/products-grid.component";
import { ProductsListComponent } from "../../components/products-list/products-list.component";
import { OptionViewComponent } from '../../components/option-view/option-view.component';
import { SearchInputComponent } from '@shared-components/search-input/search-input.component';
import { NotFoundComponent } from '@shared-components/not-found/not-found.component';
import { ActionStoreComponent } from "../../components/action-store/action-store.component";
import { ToastModule, Toast } from 'primeng/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'by-product-pages',
  templateUrl: './by-product-pages.component.html',
  providers: [MessageService, ToastModule],
  imports: [
    ProductsGridComponent,
    Toast,
    ProductsListComponent,
    OptionViewComponent,
    SearchInputComponent,
    NotFoundComponent,
    ActionStoreComponent
  ],
})
export class ByProductPagesComponent {

  private productService = inject(ProductService);
  private messageService = inject(MessageService);
  private router = inject(Router);


  selectedList: WritableSignal<boolean> = signal(true);

  allProducts = this.productService.allProducts;
  filteredProducts = this.productService.filteredProducts;

  productResource = rxResource<Product[], string>({
    stream: () => this.productService.searchProducto().pipe(
      map(products =>
        products.map(p => ({
          ...p,
          name: p.title,
          ratingValue: p.rating?.rate ?? 0
        }))
      ),
      tap(products => this.filteredProducts.set(products)),
      catchError(err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al consultar Productos',
          detail: err?.message ?? 'No se pudieron obtener productos',
          life: 4000,
        });
        return of([]);
      })
    ),
    defaultValue: [],
  });

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

  actionProduct(event: { id: number; delet: boolean }) {
    if (event.delet) {
      this.productService.deleteProduct(event.id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Producto eliminado',
            detail: 'El producto fue eliminado correctamente',
            life: 3000,
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al eliminar',
            detail: err?.message ?? 'No se pudo eliminar el producto',
            life: 4000,
          });
        },
      });
    } else {
      console.log('Edit product with ID:', event.id);
      this.router.navigate(['/product/by', event.id]);
    }
  }

}
