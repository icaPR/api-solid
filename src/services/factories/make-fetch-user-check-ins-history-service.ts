import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { GetUserMetricService } from "../get-user-metrics";
import { FetchUserCheckInsHistoryService } from "../fetch-user-check-ins-history";

export function makeFetchUserCheckInsHistoryService() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository();
  const service = new FetchUserCheckInsHistoryService(prismaCheckInsRepository);
  return service;
}
