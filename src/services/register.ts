import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExists } from "./erros/user-already-exists";

interface RegisterServiceProps {
  name: string;
  email: string;
  password: string;
}

export class RegisterService {
  constructor(private usersRepository: UsersRepository) {}

  async handleRegister({ name, email, password }: RegisterServiceProps) {
    const password_hash = await hash(password, 5);

    const userWiithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWiithSameEmail) {
      throw new UserAlreadyExists();
    }

    await this.usersRepository.create({ name, email, password_hash });
  }
}
