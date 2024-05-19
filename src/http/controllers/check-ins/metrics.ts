import { makeGetUserMetrics } from "@/services/factories/make-get-user-metrics-service";
import { FastifyRequest, FastifyReply } from "fastify";

export async function Metrics(req: FastifyRequest, res: FastifyReply) {
  const getUserMetrics = makeGetUserMetrics();

  const { checkInsCount } = await getUserMetrics.handleGetUserMetric({
    userId: req.user.sub,
  });

  return res.status(200).send({ checkInsCount });
}
