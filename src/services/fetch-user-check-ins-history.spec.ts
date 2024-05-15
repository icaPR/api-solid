import { beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { FetchUserCheckInsHistoryService } from "./fetch-user-check-ins-history";

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let fetchUserCheckInsHistoryService: FetchUserCheckInsHistoryService;

describe("Check-in services", () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    fetchUserCheckInsHistoryService = new FetchUserCheckInsHistoryService(
      inMemoryCheckInsRepository
    );
  });

  it("should be able to fetch check-in history", async () => {
    await inMemoryCheckInsRepository.create({
      gym_id: "gym_id-1",
      user_id: "user_id-1",
    });
    await inMemoryCheckInsRepository.create({
      gym_id: "gym_id-2",
      user_id: "user_id-1",
    });

    const { checkIns } =
      await fetchUserCheckInsHistoryService.handleFetchUserCheckInsHistory({
        userId: "user_id-1",
        page: 1,
      });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym_id-1" }),
      expect.objectContaining({ gym_id: "gym_id-2" }),
    ]);
  });
  it("should be able to fetch paginated check-in history", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryCheckInsRepository.create({
        gym_id: `gym_id-${i}`,
        user_id: "user_id-1",
      });
    }

    const { checkIns } =
      await fetchUserCheckInsHistoryService.handleFetchUserCheckInsHistory({
        userId: "user_id-1",
        page: 2,
      });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym_id-21" }),
      expect.objectContaining({ gym_id: "gym_id-22" }),
    ]);
  });
});
