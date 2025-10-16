import { Component, inject, input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {
  text = input.required<string>();
  showBotton = input<boolean>(true);

  location = inject(Location);

  goBack() {
    this.location.back();
  }
}
