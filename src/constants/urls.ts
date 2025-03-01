export const GET_AVAILABLE_COUNTRIES =
  'https://date.nager.at/api/v3/AvailableCountries';

export const GET_COUNTRY_INFO = (countryCode: string) =>
  `https://date.nager.at/api/v3/CountryInfo/${countryCode}`;

export const GET_COUNTRY_POPULATIONS =
  'https://countriesnow.space/api/v0.1/countries/population';

export const GET_COUNTRY_FLAG =
  'https://countriesnow.space/api/v0.1/countries/flag/images';

export const GET_HOLIDAYS = (countryCode: string, year: number) =>
  `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`;
