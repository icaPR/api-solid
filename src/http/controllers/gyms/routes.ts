import { FastifyInstance } from "fastify";
import { VerifyJWT } from "../../middlewares/verify-jwt";
import { Search } from "./search";
import { Nearby } from "./nearby";
import { Create } from "./create";
import { verifyUserRole } from "@/http/middlewares/vertify-user-role";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", VerifyJWT);

  app.post("/gyms", { onRequest: [verifyUserRole("ADMIN")] }, Create);

  app.get("/gyms/search", Search);
  app.get("/gyms/nearby", Nearby);
}
