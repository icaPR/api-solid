import { makeFetchUserCheckInsHistoryService } from "@/services/factories/make-fetch-user-check-ins-history-service";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function History(req: FastifyRequest, res: FastifyReply) {
  const historyQueryScheme = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = historyQueryScheme.parse(req.query);
  const fetchUserCheckInsHistory = makeFetchUserCheckInsHistoryService();

  const { checkIns } =
    await fetchUserCheckInsHistory.handleFetchUserCheckInsHistory({
      userId: req.user.sub,
      page,
    });

  return res.status(200).send({ checkIns });
}
