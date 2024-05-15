import { ResourceNotFound } from "./erros/resource-not-found";

import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface ValidateCheckInServiceRequest {
  checkInId: string;
}

interface ValidateCheckInServiceResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInService {
  constructor(private checkinsRepository: CheckInsRepository) {}

  async hanldeValidateCheckIn({
    checkInId,
  }: ValidateCheckInServiceRequest): Promise<ValidateCheckInServiceResponse> {
    const checkIn = await this.checkinsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFound();
    }

    checkIn.validated_at = new Date();
    await this.checkinsRepository.save(checkIn);

    return { checkIn };
  }
}
