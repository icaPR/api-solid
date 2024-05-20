import request from "supertest";
import { app } from "@/app";

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { CreateAndAuthenticateUser } from "@/utils/test/create-authenticate-user";

describe("Nearby gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list nearby gyms", async () => {
    const { token } = await CreateAndAuthenticateUser(app, true);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "gym-test",
        description: "",
        phone: "",
        latitude: 38.643837,
        longitude: -90.206814,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test",
        description: "",
        phone: "",
        latitude: 38.575176,
        longitude: -87.881397,
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({ userLagitude: 38.643837, userLongitude: -90.200814 })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ name: "gym-test" }),
    ]);
  });
});
