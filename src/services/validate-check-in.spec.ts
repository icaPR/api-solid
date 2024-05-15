import { beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { ValidateCheckInService } from "./validate-check-in";
import { ResourceNotFound } from "./erros/resource-not-found";

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let validateCheckInService: ValidateCheckInService;

describe("Validade check-in services", () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    validateCheckInService = new ValidateCheckInService(
      inMemoryCheckInsRepository
    );
  });
  it("should be able validade the check-in", async () => {
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
  it("should not be able validade an inexistent check-in", async () => {
    await expect(() =>
      validateCheckInService.hanldeValidateCheckIn({
        checkInId: "inexistent",
      })
    ).rejects.toBeInstanceOf(ResourceNotFound);
  });
});
