import { UserAlreadyExists } from "@/services/erros/user-already-exists";
import { makeCreateGymService } from "@/services/factories/make-create-gym-service";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function Create(req: FastifyRequest, res: FastifyReply) {
  const createGymBodyScheme = z.object({
    name: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { name, description, phone, latitude, longitude } =
    createGymBodyScheme.parse(req.body);
  const createGymService = makeCreateGymService();

  await createGymService.handleCreateGym({
    name,
    description,
    phone,
    latitude,
    longitude,
  });

  return res.status(201).send();
}
