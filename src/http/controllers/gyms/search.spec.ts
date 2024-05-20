import request from "supertest";
import { app } from "@/app";

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { CreateAndAuthenticateUser } from "@/utils/test/create-authenticate-user";

describe("Search gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able search a gym", async () => {
    const { token } = await CreateAndAuthenticateUser(app, true);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "gym-test",
        description: "",
        phone: "",
        latitude: 12.96319,
        longitude: -95.41398,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test",
        description: "",
        phone: "",
        latitude: 12.96319,
        longitude: -95.41498,
      });

    const response = await request(app.server)
      .get("/gyms/search")
      .query({
        query: "gym",
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        name: "gym-test",
      }),
    ]);
  });
});
