import { Prisma, CheckIn } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "crypto";
import dayjs from "dayjs";

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = [];

  async findById(checkInID: string) {
    const checkIn = this.items.find((item) => item.id === checkInID);
    if (!checkIn) {
      return null;
    }
    return checkIn;
  }

  async findByUserIdOnDateCheckin(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkInOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

      if (isOnSameDate) {
        return (checkIn.user_id = userId);
      }
    });

    if (!checkInOnSameDate) {
      return null;
    }

    return checkInOnSameDate;
  }

  async findManyByUserId(userId: string, page: number) {
    return this.items
      .filter((item) => item.user_id === userId)
      .slice(page * 20 - 20, page * 20);
  }

  async caountByUserId(userId: string) {
    return this.items.filter((item) => item.user_id === userId).length;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      user_id: data.user_id,
      gym_id: data.gym_id,
    };

    this.items.push(checkIn);
    return checkIn;
  }

  async save(checkIn: CheckIn) {
    const checkInIndex = await this.items.findIndex(
      (item) => item.id === checkIn.id
    );

    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn;
    }
    return checkIn;
  }
}
