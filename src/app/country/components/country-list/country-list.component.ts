import { Component, input, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Country } from '../../interfaces/country.interface';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NumberWithDotsPipe } from '../../../shared/pipe/number-with-dots.pipe';

@Component({
  selector: 'country-list',
  standalone: true,
  templateUrl: './country-list.component.html',
  imports: [
    DecimalPipe,
    RouterLink,
    TableModule,
    SliderModule,
    FormsModule,
    CommonModule,
    InputTextModule,
    ButtonModule,
    TagModule,
    NumberWithDotsPipe
  ]
})
export class CountryListComponent {
  countries = input.required<Country[]>();
  search = input.required<boolean>();
  errorMessage = input<string | unknown | null>();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);

  private rangeValueSignal: WritableSignal<[number, number]> = signal([0, 200_000_000]);

  get rangeValue(): [number, number] {
    return this.rangeValueSignal();
  }

  set rangeValue(val: [number, number]) {
    this.rangeValueSignal.set(val);
  }

  filter(values: [number, number]) {
    console.log('Filtrando población:', values);
  }

  getPopulationSeverity(population: number): 'success' | 'info' | 'warn' | 'danger' {
    if (population > 100_000_000) return 'danger';
    if (population > 50_000_000) return 'warn';
    if (population > 10_000_000) return 'info';
    return 'success';
  }
}
