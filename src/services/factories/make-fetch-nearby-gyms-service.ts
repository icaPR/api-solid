import { PrismaGymRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { FeatchNearbyGymsService } from "../fetch-nearby-gyms";

export function makeFeatchNearbyGymsService() {
  const prismaGymRepository = new PrismaGymRepository();
  const service = new FeatchNearbyGymsService(prismaGymRepository);
  return service;
}
