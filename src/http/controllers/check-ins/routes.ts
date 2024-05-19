import { FastifyInstance } from "fastify";
import { VerifyJWT } from "../../middlewares/verify-jwt";
import { Create } from "./create";
import { History } from "./history";
import { Metrics } from "./metrics";
import { Validate } from "./validate";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", VerifyJWT);

  app.post("/gyms/:gymId/check-ins", Create);
  app.patch("/check-ins/:checkInId/validate", Validate);

  app.get("/check-ins/history", History);
  app.get("/check-ins/metrics", Metrics);
}
