import { makeCheckInService } from "@/services/factories/make-check-in-service";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function Create(req: FastifyRequest, res: FastifyReply) {
  const createCheckInParamsBodyScheme = z.object({
    gymId: z.string().uuid(),
  });
  const createCheckInBodyScheme = z.object({
    userLatitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    userLongitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { gymId } = createCheckInParamsBodyScheme.parse(req.params);
  const { userLatitude, userLongitude } = createCheckInBodyScheme.parse(
    req.body
  );
  const checkInService = makeCheckInService();
  await checkInService.hanldeCheckIn({
    userId: req.user.sub,
    gymId,
    userLatitude,
    userLongitude,
  });

  return res.status(201).send();
}
