import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { CheckInService } from "../check-in";
import { PrismaGymRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeCheckInService() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository();
  const prismaGymRepository = new PrismaGymRepository();
  const service = new CheckInService(
    prismaCheckInsRepository,
    prismaGymRepository
  );

  return service;
}
