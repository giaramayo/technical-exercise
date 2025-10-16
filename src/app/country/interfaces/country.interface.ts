export interface Language {
  key: string;
  value: string;
}

export interface Country {
  cca2: string;
  flag: string;
  flagSvg: string;
  name: string;
  capital: string;
  population: number;
  region: string;
  subRegion: string;
  languages: Language[];
}
