import { Component, inject, signal } from '@angular/core';
import { CountryInformationComponent } from './country-information/country-information.component';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Country } from '../../interfaces/country.interface';
import { of } from 'rxjs';
import { NotFoundComponent } from '@shared-components/not-found/not-found.component';

@Component({
  selector: 'country-page',
  imports: [NotFoundComponent, CountryInformationComponent],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  route = inject(ActivatedRoute);
  countryService = inject(CountryService);

  countryCode = signal(this.route.snapshot.params['code']);

  countryResource = rxResource<Country | undefined, string>({
    params: this.countryCode,
    stream: ({ params }) => {
      if (!params) return of(undefined);
      return this.countryService.searchCountryByAlphaCode(params);
    },
    defaultValue: undefined,
  });
}
