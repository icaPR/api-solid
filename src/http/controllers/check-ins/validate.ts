import { makeValidateCheckInService } from "@/services/factories/make-validate-check-in-service";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function Validate(req: FastifyRequest, res: FastifyReply) {
  const validateCheckInParamsScheme = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = validateCheckInParamsScheme.parse(req.params);

  const validateCheckInService = makeValidateCheckInService();

  await validateCheckInService.hanldeValidateCheckIn({
    checkInId,
  });

  return res.status(204).send();
}
