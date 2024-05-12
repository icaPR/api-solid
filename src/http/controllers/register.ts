import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserAlreadyExists } from "@/services/erros/user-already-exists";
import { RegisterService } from "@/services/register";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function Register(req: FastifyRequest, res: FastifyReply) {
  const registerBodyScheme = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodyScheme.parse(req.body);
  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const registerService = new RegisterService(prismaUsersRepository);

    await registerService.handleRegister({ name, email, password });
  } catch (e) {
    if (e instanceof UserAlreadyExists) {
      return res.status(409).send({ message: e.message });
    }
    throw e;
  }

  return res.status(201).send();
}
