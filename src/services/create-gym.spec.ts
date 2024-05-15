import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymService } from "./create-gym";

let inMemoryGymsRepository: InMemoryGymsRepository;
let createGymService: CreateGymService;

describe("Create gym services", () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository();
    createGymService = new CreateGymService(inMemoryGymsRepository);
  });

  it("should be able to create gym", async () => {
    const { gym } = await createGymService.handleCreateGym({
      name: "test",
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
