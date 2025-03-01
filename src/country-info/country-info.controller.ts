import { Controller, Get, Param } from '@nestjs/common';
import { CountryInfoService } from './country-info.service';

@Controller('country-info')
export class CountryInfoController {
  constructor(private readonly countryInfoService: CountryInfoService) {}

  @Get('available')
  getAvailableCountries() {
    return this.countryInfoService.getAvailableCountries();
  }

  @Get(':country')
  getCountryInfo(@Param('country') country: string) {
    return this.countryInfoService.getCountryInfo(country);
  }
}
