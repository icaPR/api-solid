import { makeSearchGymsService } from "@/services/factories/make-search-gyms-service";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function Search(req: FastifyRequest, res: FastifyReply) {
  const searchGymsBodyScheme = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { query, page } = searchGymsBodyScheme.parse(req.query);
  const searchGymsService = makeSearchGymsService();

  const { gyms } = await searchGymsService.handleSearchGyms({
    query,
    page,
  });
  return res.status(200).send({
    gyms,
  });
}
