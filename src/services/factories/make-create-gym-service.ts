import { PrismaGymRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CreateGymService } from "../create-gym";

export function makeCreateGymService() {
  const prismaGymRepository = new PrismaGymRepository();
  const service = new CreateGymService(prismaGymRepository);
  return service;
}
