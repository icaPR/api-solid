import fastify from "fastify";
import { usersRoutes } from "./http/controllers/users/routes";
import { gymsRoutes } from "./http/controllers/gyms/routes";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import { checkInsRoutes } from "./http/controllers/check-ins/routes";

export const app = fastify();
app.register(fastifyJwt, { secret: env.JWT_SECRET });

app.register(usersRoutes);
app.register(gymsRoutes);

app.setErrorHandler((e, req, res) => {
  if (e instanceof ZodError) {
    return res
      .status(400)
      .send({ message: "Validatrion error.", issues: e.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(e);
  } else {
  }

  return res.status(500).send({ message: "Internal server error" });
});
