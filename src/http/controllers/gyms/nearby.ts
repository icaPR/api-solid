import { makeFeatchNearbyGymsService } from "@/services/factories/make-fetch-nearby-gyms-service";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function Nearby(req: FastifyRequest, res: FastifyReply) {
  const nearbyGymsScheme = z.object({
    userLagitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    userLongitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { userLagitude, userLongitude } = nearbyGymsScheme.parse(req.query);
  const featchNearbyGyms = makeFeatchNearbyGymsService();

  const { gyms } = await featchNearbyGyms.handleFeatchNearbyGyms({
    userLagitude,
    userLongitude,
  });

  return res.status(200).send({ gyms });
}
