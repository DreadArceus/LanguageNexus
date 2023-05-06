export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-node",
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.ts"],

  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
};
