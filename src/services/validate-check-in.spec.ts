import { beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { ValidateCheckInService } from "./validate-check-in";
import { ResourceNotFound } from "./erros/resource-not-found";
import { LateCheckInValidationError } from "./erros/late-check-in-validation-erro";

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let validateCheckInService: ValidateCheckInService;

describe("Validate check-in services", () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    validateCheckInService = new ValidateCheckInService(
      inMemoryCheckInsRepository
    );
  });
  it("should be able validate the check-in", async () => {
    const createdCheckIn = await inMemoryCheckInsRepository.create({
      user_id: "user-01",
      gym_id: "gym-01",
    });

    const { checkIn } = await validateCheckInService.hanldeValidateCheckIn({
      checkInId: createdCheckIn.id,
    });
    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(inMemoryCheckInsRepository.items[0].validated_at).toEqual(
      expect.any(Date)
    );
  });
  it("should not be able validate an inexistent check-in", async () => {
    await expect(() =>
      validateCheckInService.hanldeValidateCheckIn({
        checkInId: "inexistent",
      })
    ).rejects.toBeInstanceOf(ResourceNotFound);
  });
  it("should not be able to validate the check-in after 20 minutes of its creation", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 0, 1, 12, 0));

    const createdCheckIn = await inMemoryCheckInsRepository.create({
      user_id: "user-01",
      gym_id: "gym-01",
    });

    const time = 1000 * 60 * 21; // 21 minutes
    vi.advanceTimersByTime(time);

    await expect(() =>
      validateCheckInService.hanldeValidateCheckIn({
        checkInId: createdCheckIn.id,
      })
    ).rejects.toBeInstanceOf(LateCheckInValidationError);
  });
});
