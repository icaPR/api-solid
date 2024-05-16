import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FeatchNearbyGymsService } from "./fetch-nearby-gyms";
import { skip } from "node:test";

let inMemoryGymsRepository: InMemoryGymsRepository;
let featchNearbyGymsService: FeatchNearbyGymsService;

describe("Fetch Nearby Gyms services", () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository();
    featchNearbyGymsService = new FeatchNearbyGymsService(
      inMemoryGymsRepository
    );
  });

  it("should look for nearby gyms", async () => {
    await inMemoryGymsRepository.create({
      name: "Near",
      description: null,
      phone: null,
      latitude: 38.643837,
      longitude: -90.206814,
    });
    await inMemoryGymsRepository.create({
      name: "Far",
      description: null,
      phone: null,
      latitude: 38.575176,
      longitude: -87.881397,
    });

    const { gyms } = await featchNearbyGymsService.handleFeatchNearbyGyms({
      userLagitude: 38.643837,
      userLongitude: -90.200814,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ name: "Near" })]);
  });
});
