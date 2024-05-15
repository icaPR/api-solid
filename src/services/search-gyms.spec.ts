import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsService } from "./search-gyms";

let inMemoryGymsRepository: InMemoryGymsRepository;
let searchGymsService: SearchGymsService;

describe("Search gyms services", () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository();
    searchGymsService = new SearchGymsService(inMemoryGymsRepository);
  });

  it("should be able to search for gyms", async () => {
    await inMemoryGymsRepository.create({
      name: "test01",
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    });
    await inMemoryGymsRepository.create({
      name: "test02",
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    });

    const { gyms } = await searchGymsService.handleSearchGyms({
      query: "test01",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ name: "test01" })]);
  });

  it("should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryGymsRepository.create({
        name: `test${i}`,
        description: null,
        phone: null,
        latitude: 0,
        longitude: 0,
      });
    }

    const { gyms } = await searchGymsService.handleSearchGyms({
      query: "test",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ name: "test21" }),
      expect.objectContaining({ name: "test22" }),
    ]);
  });
});
