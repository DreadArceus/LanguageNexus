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

    Object.values(stats).forEach((data) => {
      expect(data).toBeDefined();
      expect(typeof data).toBe("number");
      expect(data).toBeGreaterThanOrEqual(0);
    });
  });
});
