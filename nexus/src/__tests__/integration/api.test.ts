describe("Nexus API Endpoints", () => {
  test("GET /ping responds with pong for all languages", async () => {
    const response = await fetch("http://localhost:4000/ping");
    expect(response.status).toBe(200);

    const json = await response.json();
    Object.values(json).forEach((data) => {
      expect(data).toHaveProperty("result");

      const typedData = data as Record<string, unknown>;
      if ("result" in typedData) expect(typedData.result).toEqual("pong");
    });
  });
});
