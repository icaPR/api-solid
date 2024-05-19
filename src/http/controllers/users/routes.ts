import { FastifyInstance } from "fastify";
import { Register } from "./register";
import { Authenticate } from "./authenticate";
import { Profile } from "./profile";
import { VerifyJWT } from "../../middlewares/verify-jwt";
import { Refresh } from "./refresh";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", Register);
  app.post("/sessions", Authenticate);

  app.patch("/token/refresh", Refresh);

  app.get("/profile", { onRequest: [VerifyJWT] }, Profile);
}
