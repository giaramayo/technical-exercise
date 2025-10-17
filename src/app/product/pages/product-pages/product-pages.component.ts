import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Product } from '../../interfaces/rest-product.interface';
import { catchError, of, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Toast, ToastModule } from "primeng/toast";
import { MessageService } from 'primeng/api';
import { NotFoundComponent } from "@shared-components/not-found/not-found.component";
import { ActionStoreComponent } from "../../components/action-store/action-store.component";

@Component({
  selector: 'app-product-pages',
  templateUrl: './product-pages.component.html',
  imports: [CommonModule, Toast, NotFoundComponent, ActionStoreComponent],
  providers: [MessageService, ToastModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductPagesComponent {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private messageService = inject(MessageService);

  productId = signal(this.route.snapshot.params['id']);
  product: WritableSignal<Product | undefined> = signal(undefined);

  productResource = rxResource<Product | undefined, string>({
    params: this.productId,
    stream: ({ params }) => {
      if (!params) return of(undefined);
      return this.productService.getProduct(Number(params)).pipe(
        tap(product => {
          if (!product) {
            this.messageService.add({
              severity: 'error',
              summary: 'Producto no encontrado',
              detail: `No se encontró el producto con ID ${params}`,
              life: 4000
            });
            setTimeout(() => this.router.navigate(['/product']), 1500);
          } else {
            this.product.set(product);
          }
        }),
        catchError(err => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al cargar producto',
            detail: err?.message ?? 'No se pudo obtener el producto',
            life: 4000
          });
          return of(undefined);
        })
      );
    },
    defaultValue: undefined,
  });

  actionProduct(event: { id: number; delet: boolean }) {
    if (event.delet) {
      setTimeout(() => this.router.navigate(['/product']), 2000);
    } else {
      this.router.navigate(['/product']);
    }
  }

}
