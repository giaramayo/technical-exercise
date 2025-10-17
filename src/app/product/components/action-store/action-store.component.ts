import { Component, inject, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductService } from '../../services/product.service';
import { Toast, ToastModule } from "primeng/toast";

@Component({
  selector: 'action-store',
  standalone: true,
  imports: [CommonModule, ButtonModule, TooltipModule, ConfirmDialogModule, Toast],
  templateUrl: './action-store.component.html',
  providers: [ConfirmationService, MessageService, ToastModule],
})
export class ActionStoreComponent {
  idProducts = input.required<number>();
  searchEvent = input<boolean>(true);

  onAction = output<{ id: number; delet: boolean }>();

  confirmationService = inject(ConfirmationService);
  productService = inject(ProductService);
  messageService = inject(MessageService);

  confirmDelete() {
    this.confirmationService.confirm({
      message: '¿Estás seguro que deseas eliminar este producto?',
      header: 'Eliminar Producto',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.delete(this.idProducts());
        this.onAction.emit({ id: this.idProducts(), delet: true });
      },
      reject: () => {}
    });
  }

  delete(id: number) {
    this.productService.deleteProduct(id).subscribe({
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
  }

}
