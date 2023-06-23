describe("Constants", () => {
  const originalNodeEnv = process.env.NODE_ENV;
  const originalNexusPort = process.env.NEXUS_PORT;
  const originalTypescriptPort = process.env.TYPESCRIPT_PORT;
  const originalPythonPort = process.env.PYTHON_PORT;
  const originalRubyPort = process.env.RUBY_PORT;
  const originalGoPort = process.env.GO_PORT;

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
    process.env.NEXUS_PORT = originalNexusPort;
    process.env.TYPESCRIPT_PORT = originalTypescriptPort;
    process.env.PYTHON_PORT = originalPythonPort;
    process.env.RUBY_PORT = originalRubyPort;
    process.env.GO_PORT = originalGoPort;
    jest.resetModules();
  });

  test("ports should be equal to their respective environment variables when NODE_ENV is set to 'production'", () => {
    process.env.NODE_ENV = "production";
    process.env.NEXUS_PORT = "5000";
    process.env.TYPESCRIPT_PORT = "5001";
    process.env.PYTHON_PORT = "5002";
    process.env.RUBY_PORT = "5003";
    process.env.GO_PORT = "5004";

    const {
      nexusPort,
      typescriptPort,
      pythonPort,
      rubyPort,
      goPort,
    } = require("../constants.ts"); // eslint-disable-line @typescript-eslint/no-var-requires

    expect(nexusPort).toBe(Number(process.env.NEXUS_PORT));
    expect(typescriptPort).toBe(Number(process.env.TYPESCRIPT_PORT));
    expect(pythonPort).toBe(Number(process.env.PYTHON_PORT));
    expect(rubyPort).toBe(Number(process.env.RUBY_PORT));
    expect(goPort).toBe(Number(process.env.GO_PORT));
  });

  test("ports should be their default values when NODE_ENV is not set to 'production'", () => {
    process.env.NODE_ENV = "development";
    process.env.NEXUS_PORT = "5000";
    process.env.TYPESCRIPT_PORT = "5001";
    process.env.PYTHON_PORT = "5002";
    process.env.RUBY_PORT = "5003";
    process.env.GO_PORT = "5004";

    const {
      nexusPort,
      typescriptPort,
      pythonPort,
      rubyPort,
      goPort,
    } = require("../constants.ts"); // eslint-disable-line @typescript-eslint/no-var-requires

    expect(nexusPort).toBe(4000);
    expect(typescriptPort).toBe(4001);
    expect(pythonPort).toBe(4002);
    expect(rubyPort).toBe(4003);
    expect(goPort).toBe(4004);
  });

  test("langInfo and routes should have the correct structure", () => {
    const { langInfo, getRoutes, postRoutes } = require("../constants.ts"); // eslint-disable-line @typescript-eslint/no-var-requires

    expect(langInfo).toMatchObject({
      TypeScript: expect.any(Number),
      Python: expect.any(Number),
      Ruby: expect.any(Number),
      Go: expect.any(Number),
    });

    expect(getRoutes).toEqual(expect.arrayContaining(["ping"]));
    expect(postRoutes).toEqual(expect.arrayContaining(["normalize"]));
  });
});
