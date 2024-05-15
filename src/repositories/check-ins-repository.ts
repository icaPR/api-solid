import { Prisma, CheckIn } from "@prisma/client";

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  save(checkIn: CheckIn): Promise<CheckIn>;
  findByUserIdOnDateCheckin(
    userId: string,
    date: Date
  ): Promise<CheckIn | null>;
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>;
  findById(checkInID: string): Promise<CheckIn | null>;
  caountByUserId(userId: string): Promise<number>;
}
