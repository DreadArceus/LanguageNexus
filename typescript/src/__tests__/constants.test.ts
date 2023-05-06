describe("Constants", () => {
  const originalNodeEnv = process.env.NODE_ENV;
  const originalPort = process.env.PORT;

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
    process.env.PORT = originalPort;
    jest.resetModules();
  });

  test("port should be equal to the PORT environment variable when NODE_ENV is set to 'production'", () => {
    process.env.NODE_ENV = "production";
    process.env.PORT = "4090";

    const productionPort = require("../constants.ts").port; // eslint-disable-line @typescript-eslint/no-var-requires
    expect(productionPort).toBe(Number(process.env.PORT));
  });

  test("port should be 4001 when NODE_ENV is not set to 'production'", () => {
    process.env.NODE_ENV = "development";
    process.env.PORT = "4090";

    const developmentPort = require("../constants.ts").port; // eslint-disable-line @typescript-eslint/no-var-requires
    expect(developmentPort).toBe(4001);
  });
});
