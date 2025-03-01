import { Injectable } from '@nestjs/common';
import { CreateUser } from './types';
import { Holiday, PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {
  private readonly userRepository = new PrismaClient().user;
  private readonly holidayRepository = new PrismaClient().holiday;

  async create(user: CreateUser) {
    const createdUser = await this.userRepository.create({
      data: {
        name: user.name,
      },
    });

    return createdUser;
  }

  async getUser(userId: number) {
    return await this.userRepository.findUnique({
      where: {
        id: userId,
      },
      include: {
        savedHolidays: true,
      },
    });
  }

  async addHoliday(userId: number, holidays: Holiday[]) {
    const user = await this.userRepository.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });

    const createdHolidays = await this.holidayRepository.createMany({
      data: holidays.map((holiday) => {
        return {
          ...holiday,
          launchYear: holiday.launchYear || 0,
          counties: holiday.counties || [],
          date: new Date(holiday.date),
          userId: user.id,
        };
      }),
    });

    return createdHolidays;
  }
}
