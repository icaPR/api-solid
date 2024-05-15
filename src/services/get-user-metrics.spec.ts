import { beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { GetUserMetricService } from "./get-user-metrics";

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let getUserMetricService: GetUserMetricService;

describe("Get User Metrics service", () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    getUserMetricService = new GetUserMetricService(inMemoryCheckInsRepository);
  });
  it("get check-in count", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryCheckInsRepository.create({
        gym_id: `gym_id-${i}`,
        user_id: "user_id-1",
      });
    }

    const { checkInsCount } = await getUserMetricService.handleGetUserMetric({
      userId: "user_id-1",
    });

    expect(checkInsCount).toEqual(22);
  });
});
