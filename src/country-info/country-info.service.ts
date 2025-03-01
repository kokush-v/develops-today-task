import { Injectable, NotFoundException } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import {
  GET_AVAILABLE_COUNTRIES,
  GET_COUNTRY_FLAG,
  GET_COUNTRY_INFO,
  GET_COUNTRY_POPULATIONS,
} from 'src/constants/urls';
import {
  GetAvailableCountriesResponse,
  GetCountryFlagResponse,
  GetCountryInfoResponse,
  GetCountryPopulationsResponse,
} from '../types/ursl.responses';

@Injectable()
export class CountryInfoService {
  async getAvailableCountries() {
    const { data } = await axios.get<GetAvailableCountriesResponse>(
      GET_AVAILABLE_COUNTRIES,
    );

    return data;
  }

  async getCountryInfo(countryCode: string) {
    try {
      const { data: countryInfoRes } = await axios.get<GetCountryInfoResponse>(
        GET_COUNTRY_INFO(countryCode),
      );

      const { data: countryPopulationRes } =
        await axios.post<GetCountryPopulationsResponse>(
          GET_COUNTRY_POPULATIONS,
          {
            country: countryInfoRes.commonName,
          },
        );

      const { data: countryFlagRes } = await axios.post<GetCountryFlagResponse>(
        GET_COUNTRY_FLAG,
        {
          iso2: countryInfoRes.countryCode,
        },
      );

      return {
        name: countryInfoRes.commonName,
        borderCountries: countryInfoRes.borders,
        population: countryPopulationRes.data.populationCounts,
        flag: countryFlagRes.data.unicodeFlag,
      };
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        if (e.status === 404) {
          throw new NotFoundException(
            `Country with code ${countryCode} not found`,
          );
        }
      }
    }
  }
}
