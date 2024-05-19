import { FastifyInstance } from "fastify";
import { VerifyJWT } from "../../middlewares/verify-jwt";
import { Search } from "./search";
import { Nearby } from "./nearby";
import { Create } from "./create";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", VerifyJWT);

  app.post("/gyms", Create);

  app.get("/gyms/search", Search);
  app.get("/gyms/nearby", Nearby);
}
