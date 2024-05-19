import request from "supertest";
import { FastifyInstance } from "fastify";

export async function CreateAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post("/users").send({
    name: "name test",
    email: "email@test.com",
    password: "123456",
  });

  const authResponse = await request(app.server)
    .post("/sessions")
    .send({ email: "email@test.com", password: "123456" });
  const { token } = authResponse.body;

  return { token };
}
