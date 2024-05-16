import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface GetUserMetricServiceProps {
  userId: string;
}

interface GetUserMetricServiceResponse {
  checkInsCount: number;
}

export class GetUserMetricService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async handleGetUserMetric({
    userId,
  }: GetUserMetricServiceProps): Promise<GetUserMetricServiceResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId);
    return { checkInsCount };
  }
}
