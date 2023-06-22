import request from "supertest";
import { app } from "../index";

describe("API Endpoints", () => {
  test("GET /ping should return 'pong'", async () => {
    const response = await request(app).get("/ping");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ result: "pong" });
  });

  test("POST /normalize should normalize valid data", async () => {
    const validData = [
      [10, 20, 30, 40, 50],
      [10.5, 20.5, 30.5, 40.5, 50.5],
    ];

    for (const data of validData) {
      const response = await request(app).post("/normalize").send({ data });
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        normalizedData: [0, 0.25, 0.5, 0.75, 1],
      });
    }
  });

  test("POST /normalize should not break for an array with one unique element", async () => {
    const data = [7, 7, 7];
    const response = await request(app).post("/normalize").send({ data });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      normalizedData: [0, 0, 0],
    });
  });

  test("POST /normalize should not break for an empty array", async () => {
    const data: number[] = [];
    const response = await request(app).post("/normalize").send({ data });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ normalizedData: [] });
  });

  test("POST /normalize should return an error for invalid data", async () => {
    const invalidData = [[10, 20, "30", 40, 50], "yeah"];

    for (const data of invalidData) {
      const response = await request(app).post("/normalize").send({ data });
      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        error: "Input must be an array of numbers.",
      });
    }
  });
});
