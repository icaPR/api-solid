import { Gym } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

interface FeatchNearbyGymsServiceProps {
  userLagitude: number;
  userLongitude: number;
}

interface FeatchNearbyGymsServiceResponse {
  gyms: Gym[];
}

export class FeatchNearbyGymsService {
  constructor(private gymsRepository: GymsRepository) {}

  async handleFeatchNearbyGyms({
    userLagitude,
    userLongitude,
  }: FeatchNearbyGymsServiceProps): Promise<FeatchNearbyGymsServiceResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLagitude,
      longitude: userLongitude,
    });

    return { gyms };
  }
}
