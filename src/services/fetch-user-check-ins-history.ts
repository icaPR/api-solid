import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface FetchUserCheckInsHistoryServiceProps {
  userId: string;
  page: number;
}

interface FetchUserCheckInsHistoryServiceResponse {
  checkIns: CheckIn[];
}

export class FetchUserCheckInsHistoryService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async handleFetchUserCheckInsHistory({
    userId,
    page,
  }: FetchUserCheckInsHistoryServiceProps): Promise<FetchUserCheckInsHistoryServiceResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page
    );
    return { checkIns };
  }
}
