import request from "supertest";
import { app } from "@/app";

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { CreateAndAuthenticateUser } from "@/utils/test/create-authenticate-user";
import { prisma } from "@/lib/prisma";

describe("Check-in history (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able list the history of check-ins", async () => {
    const { token } = await CreateAndAuthenticateUser(app);
    const user = await prisma.user.findFirstOrThrow();

    const gym = await prisma.gym.create({
      data: {
        name: "gym-test",
        latitude: 12.96319,
        longitude: -95.41398,
      },
    });

    await prisma.checkIn.createMany({
      data: [
        {
          user_id: user.id,
          gym_id: gym.id,
        },
        {
          user_id: user.id,
          gym_id: gym.id,
        },
      ],
    });

    const response = await request(app.server)
      .get("/check-ins/history")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({ user_id: user.id, gym_id: gym.id }),
      expect.objectContaining({ user_id: user.id, gym_id: gym.id }),
    ]);
  });
});
