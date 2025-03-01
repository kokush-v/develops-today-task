import { Holiday } from '@prisma/client';

export interface GetAvailableCountriesResponse {
  countryCode: string;
  name: string;
}

export interface GetCountryInfoResponse {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: string[];
}

export interface GetCountryPopulationsResponse {
  error: boolean;
  msg: string;
  data: {
    country: string;
    code: string;
    iso3: string;
    populationCounts: PopulationCounts[];
  };
}

export interface PopulationCounts {
  year: number;
  value: number;
}

export interface GetCountryFlagResponse {
  error: boolean;
  msg: string;
  data: {
    name: string;
    iso2: string;
    iso3: string;
    unicodeFlag: string;
  };
}
