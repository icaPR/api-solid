import request from "supertest";
import { app } from "@/app";

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { CreateAndAuthenticateUser } from "@/utils/test/create-authenticate-user";

describe("Profile (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get user profile ", async () => {
    const { token } = await CreateAndAuthenticateUser(app);

    const response = await request(app.server)
      .get("/profile")
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(response.statusCode).toEqual(200);
    expect(response.body.user).toEqual(
      expect.objectContaining({ email: "email@test.com" })
    );
  });
});
