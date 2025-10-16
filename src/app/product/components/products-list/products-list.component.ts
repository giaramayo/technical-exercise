import { Component, input, signal, WritableSignal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../interfaces/rest-product.interface';
import { ActionStoreComponent } from "../action-store/action-store.component";

@Component({
  selector: 'products-list',
  standalone: true,
  templateUrl: './products-list.component.html',
  imports: [
    TableModule,
    SliderModule,
    FormsModule,
    CommonModule,
    InputTextModule,
    ButtonModule,
    TagModule,
    ActionStoreComponent
]
})
export class ProductsListComponent {
  products = input.required<Product[]>();
  isEmpty = input<boolean>(false);

}
