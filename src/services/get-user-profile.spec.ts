import { beforeEach, describe, expect, it } from "vitest";
import { compare, hash } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { GetUserProfileService } from "./get-user-profile";
import { ResourceNotFound } from "./erros/resource-not-found";

let inMemoryUsersRepository: InMemoryUsersRepository;
let getUserProfileService: GetUserProfileService;

describe("Get user profile services", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    getUserProfileService = new GetUserProfileService(inMemoryUsersRepository);
  });

  it("should be able to get user profile", async () => {
    const createUser = await inMemoryUsersRepository.create({
      name: "test",
      email: "test@email.com",
      password_hash: await hash("123456", 5),
    });
    const { user } = await getUserProfileService.handleGetUser({
      userId: createUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
  });
  it("should not be able to get user profile with wrong id", async () => {
    await expect(() =>
      getUserProfileService.handleGetUser({
        userId: "id-not-exist",
      })
    ).rejects.toBeInstanceOf(ResourceNotFound);
  });
});
