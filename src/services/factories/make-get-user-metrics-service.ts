import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { GetUserMetricService } from "../get-user-metrics";

export function makeGetUserMetrics() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository();
  const service = new GetUserMetricService(prismaCheckInsRepository);
  return service;
}
