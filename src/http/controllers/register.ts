import { prisma } from "@/lib/prisma";
import { FastifyRequest, FastifyReply } from "fastify";
import { hash } from "bcryptjs";
import { z } from "zod";

export async function Register(req: FastifyRequest, res: FastifyReply) {
  const registerBodyScheme = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodyScheme.parse(req.body);

  const password_hash = await hash(password, 5);
  const userWiithSameEmail = await prisma.user.findUnique({
    where: { email },
  });

  if (userWiithSameEmail) {
    return res.status(409).send();
  }

  await prisma.user.create({
    data: { name, email, password_hash },
  });

  return res.status(201).send();
}
