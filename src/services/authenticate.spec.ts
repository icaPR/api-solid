import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateService } from "./authenticate";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { InvalidCredentials } from "./erros/invalid-credentials";

let inMemoryUsersRepository: InMemoryUsersRepository;
let authenticateService: AuthenticateService;

describe("Authenticate services", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    authenticateService = new AuthenticateService(inMemoryUsersRepository);
  });

  it("should be able to authenticate", async () => {
    await inMemoryUsersRepository.create({
      id: "1",
      name: "test",
      email: "test@email.com",
      password_hash: await hash("123456", 5),
      created_at: new Date(),
    });

    const { user } = await authenticateService.hanldeAuthenticate({
      email: "test@email.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should be not able to authenticate with wrong email", async () => {
    await inMemoryUsersRepository.create({
      id: "1",
      name: "test",
      email: "test@email.com",
      password_hash: await hash("123456", 5),
      created_at: new Date(),
    });

    await expect(() =>
      authenticateService.hanldeAuthenticate({
        email: "test2@email.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentials);
  });

  it("should be not able to authenticate with wrong password", async () => {
    await inMemoryUsersRepository.create({
      id: "1",
      name: "test",
      email: "test@email.com",
      password_hash: await hash("123456", 5),
      created_at: new Date(),
    });

    await expect(() =>
      authenticateService.hanldeAuthenticate({
        email: "test@email.com",
        password: "123457",
      })
    ).rejects.toBeInstanceOf(InvalidCredentials);
  });
});
