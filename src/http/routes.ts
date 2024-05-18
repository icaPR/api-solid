import { FastifyInstance } from "fastify";
import { Register } from "./controllers/register";
import { Authenticate } from "./controllers/authenticate";
import { Profile } from "./controllers/profile";
import { VerifyJWT } from "./middlewares/verify-jwt";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", Register);
  app.post("/sessions", Authenticate);

  app.get("/profile", { onRequest: [VerifyJWT] }, Profile);
}
