import { Component, ContentChild, input, output, signal, TemplateRef, WritableSignal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../interfaces/rest-product.interface';

@Component({
  selector: 'products-grid',
  standalone: true,
  templateUrl: './products-grid.component.html',
  imports: [
    TableModule,
    SliderModule,
    FormsModule,
    CommonModule,
    InputTextModule,
    ButtonModule,
    TagModule,
]
})
export class ProductsGridComponent {
  products = input.required<Product[]>();
  isEmpty = input<boolean>(false);

  @ContentChild(TemplateRef) itemTemplate!: TemplateRef<any>;

}
