import { CommonModule } from '@angular/common';
import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'product-option-view',
  imports: [CommonModule],
  templateUrl: './option-view.component.html',
  standalone: true,
})
export class OptionViewComponent {

  public onSelectList = output<boolean>();

  selectedList = signal(true);

  selectList(value: boolean) {
    this.selectedList.set(value);
    this.onSelectList.emit(value);
  }

}
