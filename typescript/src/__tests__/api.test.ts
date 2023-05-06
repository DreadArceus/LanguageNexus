import request from "supertest";
import { app } from "../index";

describe("API Endpoints", () => {
  test("GET /ping should return 'pong'", async () => {
    const response = await request(app).get("/ping");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ result: "pong" });
  });
});
