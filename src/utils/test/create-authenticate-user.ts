import request from "supertest";
import { FastifyInstance } from "fastify";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function CreateAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin: boolean = false
) {
  await prisma.user.create({
    data: {
      name: "name test",
      email: "email@test.com",
      password_hash: await hash("123456", 5),
      role: isAdmin ? "ADMIN" : "MEMBER",
    },
  });

  const authResponse = await request(app.server)
    .post("/sessions")
    .send({ email: "email@test.com", password: "123456" });
  const { token } = authResponse.body;

  return { token };
}
