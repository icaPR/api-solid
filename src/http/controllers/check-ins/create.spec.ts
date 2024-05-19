import request from "supertest";
import { app } from "@/app";

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { CreateAndAuthenticateUser } from "@/utils/test/create-authenticate-user";
import { prisma } from "@/lib/prisma";

describe("Create check-in (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a check-in", async () => {
    const { token } = await CreateAndAuthenticateUser(app);

    const gym = await prisma.gym.create({
      data: {
        name: "gym-test",
        latitude: 12.96319,
        longitude: -95.41398,
      },
    });

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        userLatitude: 12.96319,
        userLongitude: -95.41398,
      });
    expect(response.statusCode).toEqual(201);
  });
});
