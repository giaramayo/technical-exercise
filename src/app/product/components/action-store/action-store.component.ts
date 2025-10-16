import { Component, EventEmitter, input, Input, output, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';
import { Product } from '../../interfaces/rest-product.interface';

@Component({
  selector: 'action-store',
  standalone: true,
  imports: [CommonModule, ButtonModule, TooltipModule],
  templateUrl: './action-store.component.html',
})
export class ActionStoreComponent {
  idProducts = input.required<number>();
  onAction = output<{ id: number; delet: boolean }>();
}
