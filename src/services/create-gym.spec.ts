import { beforeEach, describe, expect, it } from "vitest";
import { RegisterService } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExists } from "./erros/user-already-exists";

let inMemoryUsersRepository: InMemoryUsersRepository;
let registerService: RegisterService;

describe("Create gym services", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    registerService = new RegisterService(inMemoryUsersRepository);
  });

  it("user password must be hashed", async () => {
    const { user } = await registerService.handleRegister({
      name: "test",
      email: "test@email.com",
      password: "123456",
    });
    const isPasswordHashCorrectly = await compare("123456", user.password_hash);

    expect(isPasswordHashCorrectly).toBe(true);
  });
});
