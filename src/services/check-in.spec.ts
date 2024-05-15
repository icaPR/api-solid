import { beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInService } from "./check-in";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxDistanceError } from "./erros/max-distance-error";
import { MaxNumberOfCheckInsError } from "./erros/max-number-of-check-ins-error";

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let inMemoryGymsRepository: InMemoryGymsRepository;
let checkInService: CheckInService;

describe("Check-in services", () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    inMemoryGymsRepository = new InMemoryGymsRepository();
    checkInService = new CheckInService(
      inMemoryCheckInsRepository,
      inMemoryGymsRepository
    );

    await inMemoryGymsRepository.create({
      id: "gym_id-1",
      name: "Test gym",
      description: "",
      phone: "",
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    });
  });

  it("should be able to check in", async () => {
    const { checkIn } = await checkInService.hanldeCheckIn({
      userId: "user_id-1",
      gymId: "gym_id-1",
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
  it("should not be able to check in twice in the same day", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 4, 13, 5, 0, 0));

    await checkInService.hanldeCheckIn({
      userId: "user_id-1",
      gymId: "gym_id-1",
      userLatitude: 0,
      userLongitude: 0,
    });

    await expect(() =>
      checkInService.hanldeCheckIn({
        userId: "user_id-1",
        gymId: "gym_id-1",
        userLatitude: 0,
        userLongitude: 0,
      })
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);

    vi.useRealTimers();
  });

  it("should not be able to check in on distant gym", async () => {
    inMemoryGymsRepository.items.push({
      id: "gym_id-2",
      name: "Test gym",
      description: "",
      phone: "",
      latitude: new Decimal(48.841624),
      longitude: new Decimal(2.348282),
    });
    await expect(() =>
      checkInService.hanldeCheckIn({
        userId: "user_id-1",
        gymId: "gym_id-2",
        userLatitude: 48.841106,
        userLongitude: 2.352688,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
