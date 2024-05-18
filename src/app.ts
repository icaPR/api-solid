import fastify from "fastify";
import { appRoutes } from "./http/routes";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";

export const app = fastify();
app.register(fastifyJwt, { secret: env.JWT_SECRET });
app.register(appRoutes);

app.setErrorHandler((e, req, res) => {
  if (e instanceof ZodError) {
    return res
      .status(404)
      .send({ message: "Validatrion error.", issues: e.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(e);
  } else {
  }

  return res.status(500).send({ message: "Internal server error" });
});
