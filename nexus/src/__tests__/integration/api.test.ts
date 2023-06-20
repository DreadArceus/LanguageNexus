import request from "supertest";
import { app } from "../../index";

describe("Nexus API Endpoints", () => {
  test("GET /ping responds with pong for all languages", async () => {
    const response = await request(app).get("/ping");
    expect(response.status).toBe(200);

    Object.values(response.body).forEach((data) => {
      expect(data).toHaveProperty("result");

      const typedData = data as Record<string, unknown>;
      if ("result" in typedData) expect(typedData.result).toEqual("pong");
    });
  });
});
