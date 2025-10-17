import { Component, inject, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'action-store',
  standalone: true,
  imports: [CommonModule, ButtonModule, TooltipModule, ConfirmDialogModule],
  templateUrl: './action-store.component.html',
  providers: [ConfirmationService],
})
export class ActionStoreComponent {
  idProducts = input.required<number>();
  onAction = output<{ id: number; delet: boolean }>();

  confirmationService = inject(ConfirmationService);

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
        this.onAction.emit({ id: this.idProducts(), delet: true });
      },
      reject: () => {}
    });
  }
}
