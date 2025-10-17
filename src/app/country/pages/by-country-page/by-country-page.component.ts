import { ChangeDetectionStrategy, Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from '../../interfaces/country.interface';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SearchInputComponent } from '@shared-components/search-input/search-input.component';

@Component({
  selector: 'by-country-page',
  imports: [SearchInputComponent, CountryListComponent, ToastModule],
  templateUrl: './by-country-page.component.html',
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ByCountryPageComponent {
  countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  messageService = inject(MessageService);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = linkedSignal(() => this.queryParam);

  countryResource = rxResource<Country[], string>({
    params: this.query,
    stream: ({ params }) => {
      if (!params) return of([]);

      this.router.navigate(['/country/by-country'], {
        queryParams: { query: params },
      });

      return this.countryService.searchByCountry(params).pipe(
        catchError((err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al consultar País',
            detail: err?.message ?? 'No se pudieron obtener información',
            life: 4000,
          });
          return of([]);
        })
      );
    },
    defaultValue: [],
  });
}
