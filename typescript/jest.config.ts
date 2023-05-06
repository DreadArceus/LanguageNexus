export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-node",
  roots: ["<rootDir>/src"],

  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
};
