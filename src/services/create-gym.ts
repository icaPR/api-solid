import { Gym } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

interface CreateGymServiceProps {
  name: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface CreateGymServiceResponse {
  gym: Gym;
}

export class CreateGymService {
  constructor(private gymsRepository: GymsRepository) {}

  async handleCreateGym({
    name,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymServiceProps): Promise<CreateGymServiceResponse> {
    const gym = await this.gymsRepository.create({
      name,
      description,
      phone,
      latitude,
      longitude,
    });

    return { gym };
  }
}
