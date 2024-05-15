import { Prisma, Gym } from "@prisma/client";

export interface FindManyNearbyProps {
  latitude: number;
  longitude: number;
}

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>;
  searchMany(query: string, page: number): Promise<Gym[]>;
  findManyNearby(pramas: FindManyNearbyProps): Promise<Gym[]>;
  create(data: Prisma.GymCreateInput): Promise<Gym>;
}
