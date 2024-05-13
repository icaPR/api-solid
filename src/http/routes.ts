import { FastifyInstance } from "fastify";
import { Register } from "./controllers/register";
import { Authenticate } from "./controllers/authenticate";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", Register);
  app.post("/sessions", Authenticate);
}
