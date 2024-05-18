import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateService } from "@/services/authenticate";
import { InvalidCredentials } from "@/services/erros/invalid-credentials";
import { makeAuthenticateService } from "@/services/factories/make-authenticate-service";

import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function Authenticate(req: FastifyRequest, res: FastifyReply) {
  const authenticateBodyScheme = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodyScheme.parse(req.body);

  try {
    const authenticateService = makeAuthenticateService();

    const { user } = await authenticateService.hanldeAuthenticate({
      email,
      password,
    });
    const token = await res.jwtSign({}, { sign: { sub: user.id } });

    return res.status(200).send({ token });
  } catch (e) {
    if (e instanceof InvalidCredentials) {
      return res.status(400).send({ message: e.message });
    }
    throw e;
  }
}
