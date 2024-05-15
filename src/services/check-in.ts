import { InvalidCredentials } from "./erros/invalid-credentials";
import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { ResourceNotFound } from "./erros/resource-not-found";
import { getDistanceBetweenCoord } from "@/utils/get-distance-between-coord";
import { MaxNumberOfCheckInsError } from "./erros/max-number-of-check-ins-error";
import { MaxDistanceError } from "./erros/max-distance-error";

interface CheckInServiceRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInServiceResponse {
  checkIn: CheckIn;
}

export class CheckInService {
  constructor(
    private checkinsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository
  ) {}

  async hanldeCheckIn({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFound();
    }

    const distance = getDistanceBetweenCoord(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
    );
    const MAX_DISTANCE_IN_KM = 0.1; //100 meters
    if (distance > MAX_DISTANCE_IN_KM) {
      throw new MaxDistanceError();
    }
    const checkInOnSameDate =
      await this.checkinsRepository.findByUserIdOnDateCheckin(
        userId,
        new Date()
      );

    if (checkInOnSameDate) {
      throw new MaxNumberOfCheckInsError();
    }

    const checkIn = await this.checkinsRepository.create({
      user_id: userId,
      gym_id: gymId,
    });

    if (!checkIn) {
      throw new InvalidCredentials();
    }

    return { checkIn };
  }
}
