import { PrismaGymRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { SearchGymsService } from "../search-gyms";

export function makeSearchGymsService() {
  const prismaGymRepository = new PrismaGymRepository();
  const service = new SearchGymsService(prismaGymRepository);
  return service;
}
