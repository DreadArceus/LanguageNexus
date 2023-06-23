import { constructPostOptions } from "../../utils";
import type { Stats } from "../../types";

describe("Nexus API Endpoints", () => {
  test("GET /ping responds with pong for all languages", async () => {
    const response = await fetch("http://localhost:4000/ping");
    expect(response.status).toBe(200);

    const { results, stats } = await response.json();

    Object.values(results).forEach((data) => {
      expect(data).toHaveProperty("result");
      const typedData = data as Record<string, unknown>;
      if ("result" in typedData) expect(typedData.result).toEqual("pong");
    });

    statTest(stats);
  });

  test("POST /normalize works for all languages", async () => {
    const response = await fetch(
      "http://localhost:4000/normalize",
      constructPostOptions({ data: [1, 2, 3, 9] })
    );
    expect(response.status).toBe(200);

    const { results, stats } = await response.json();
    const expectedResult = [0, 0.125, 0.25, 1];

    Object.values(results).forEach((data) => {
      expect(data).toHaveProperty("normalizedData");
      const typedData = data as Record<string, unknown>;
      if ("normalizedData" in typedData)
        expect(typedData.normalizedData).toEqual(expectedResult);
    });

    statTest(stats);
  });
});

const statTest = (stats: Stats) => {
  Object.values(stats).forEach((data) => {
    expect(data).toBeDefined();
    expect(data).not.toBe("error");
    expect(typeof data).toBe("number");
    expect(data).toBeGreaterThanOrEqual(0);
  });
};
