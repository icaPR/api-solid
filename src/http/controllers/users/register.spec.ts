import request from "supertest";
import { app } from "@/app";

import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Register (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able register ", async () => {
    const response = await request(app.server)
      .post("/users")
      .send({ name: "name test", email: "email@test.com", password: "123456" });

    expect(response.statusCode).toEqual(201);
  });
});
