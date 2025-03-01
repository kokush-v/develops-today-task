import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AddNewHoliday, CreateUser } from './types';
import axios from 'axios';
import { GET_HOLIDAYS } from 'src/constants/urls';
import { Holiday } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  register(@Body() user: CreateUser) {
    return this.userService.create(user);
  }

  @Get(':userId')
  getUser(@Param('userId') userId: string) {
    return this.userService.getUser(parseInt(userId));
  }

  @Post(':userId/calendar/holidays')
  async addHoliday(
    @Param('userId') userId: string,
    @Body() reqBody: AddNewHoliday,
  ) {
    const { countryCode, holidays, year } = reqBody;

    const { data: holidaysData } = await axios.get<Holiday[]>(
      GET_HOLIDAYS(countryCode, year),
    );

    const holidaysToAdd = holidays.map((holiday) => {
      return holidaysData.find((data) => data.name === holiday);
    }) as Holiday[];

    if (holidaysToAdd.some((holiday) => !holiday)) {
      throw new NotFoundException('Some holidays not found');
    }

    return this.userService.addHoliday(parseInt(userId), holidaysToAdd);
  }
}
