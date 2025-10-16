import type { Country } from '../interfaces/country.interface';
import type { RESTCountry } from '../interfaces/rest-countries.interface';

export class CountryMapper {
  static mapRestCountryToCountry(restCountry: RESTCountry): Country {
    return {
      capital: restCountry.capital?.join(','),
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? 'No Spanish Name',
      population: restCountry.population,
      region: restCountry.region,
      subRegion: restCountry.subregion,
      languages: restCountry.languages
        ? Object.keys(restCountry.languages)
          .map(key => {
            const value = restCountry.languages![key as keyof typeof restCountry.languages];
            return value ? { key, value } : null;
          })
          .filter((x): x is { key: string; value: string } => x !== null)
        : [],
    };
  }
  static mapRestCountryArrayToCountryArray(restCountries: RESTCountry[]): Country[] {
    return restCountries.map(this.mapRestCountryToCountry);
  }
}
