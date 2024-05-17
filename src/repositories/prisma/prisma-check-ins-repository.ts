import { prisma } from "@/lib/prisma";
import { CheckIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import dayjs from "dayjs";

export class PrismaCheckInsRepository implements CheckInsRepository {
  async save(checkIn: CheckIn) {
    const checkInUpdate = await prisma.checkIn.update({
      where: {
        id: checkIn.id,
      },
      data: checkIn,
    });

    return checkInUpdate;
  }

  async findManyByUserId(userId: string, page: number) {
    const chackIns = await prisma.checkIn.findMany({
      where: { user_id: userId },
      take: 20,
      skip: page * 20 - 20,
    });
    return chackIns;
  }

  async findById(checkInId: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id: checkInId,
      },
    });
    return checkIn;
  }

  async countByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    });

    return count;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const user = await prisma.checkIn.create({
      data,
    });

    return user;
  }
  async findByUserIdOnDateCheckin(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkInOnSameDate = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    });

    return checkInOnSameDate;
  }
}
