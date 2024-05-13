import { describe, expect, it } from "vitest";
import { RegisterService } from "./register";
import { compare, hash } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExists } from "./erros/user-already-exists";

describe("Register services", () => {
  it("user password must be hashed", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const registerService = new RegisterService(inMemoryUsersRepository);

    const { user } = await registerService.handleRegister({
      name: "test",
      email: "test@email.com",
      password: "123456",
    });
    const isPasswordHashCorrectly = await compare("123456", user.password_hash);

    expect(isPasswordHashCorrectly).toBe(true);
  });
  it("should not be possible to register two identical emails", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const registerService = new RegisterService(inMemoryUsersRepository);

    await registerService.handleRegister({
      name: "test",
      email: "test@email.com",
      password: "123456",
    });

    expect(() =>
      registerService.handleRegister({
        name: "test",
        email: "test@email.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExists);
  });
  it("should be able to register", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const registerService = new RegisterService(inMemoryUsersRepository);

    const { user } = await registerService.handleRegister({
      name: "test",
      email: "test@email.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
