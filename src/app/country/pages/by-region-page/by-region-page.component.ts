import { Component, inject, linkedSignal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { Region } from '../../interfaces/region.type';
import { ActivatedRoute, Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { Country } from '../../interfaces/country.interface';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

function validateQueryParam(queryParam: string): Region {
  queryParam = queryParam.toLowerCase();

  const validRegions: Record<string, Region> = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
    antarctic: 'Antarctic',
    antarctic2: 'Antarctic2',
  };

  return validRegions[queryParam] ?? 'Americas';
}

@Component({
  selector: 'by-region-page',
  imports: [CountryListComponent, ToastModule],
  templateUrl: './by-region-page.component.html',
  providers: [MessageService],
})
export class ByRegionPageComponent {
  countryService = inject(CountryService);

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
    'Antarctic2',
  ];

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  messageService = inject(MessageService);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';

  selectedRegion = linkedSignal<Region>(() =>
    validateQueryParam(this.queryParam)
  );

  countryResource = rxResource<Country[], Region>({
    params: this.selectedRegion,
    stream: ({ params }) => {
      console.log('params', params);
      if (!params) return of([]);

      this.router.navigate(['/country/by-region'], {
        queryParams: { region: params },
      });

      return this.countryService.searchByRegion(params).pipe(
        catchError((err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al consultar Región',
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
