import { Module } from '@nestjs/common';
import { CountryInfoModule } from './country-info/country-info.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [CountryInfoModule, UserModule],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
