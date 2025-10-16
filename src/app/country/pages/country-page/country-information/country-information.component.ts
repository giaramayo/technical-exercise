import { Component, computed, input } from '@angular/core';
import { Country } from '../../../interfaces/country.interface';
import { NumberWithDotsPipe } from '../../../../shared/pipe/number-with-dots.pipe';

@Component({
  selector: 'country-information-pages',
  imports: [NumberWithDotsPipe],
  templateUrl: './country-information.component.html',
})
export class CountryInformationComponent {
  country = input.required<Country>();

  currentYear = computed(() => {
    return new Date().getFullYear();
  });

}
