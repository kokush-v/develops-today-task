import { Module } from '@nestjs/common';
import { CountryInfoService } from './country-info.service';
import { CountryInfoController } from './country-info.controller';

@Module({
  providers: [CountryInfoService],
  controllers: [CountryInfoController],
})
export class CountryInfoModule {}
