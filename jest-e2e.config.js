/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/tests/setupTests.ts"],
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(e2e).ts?(x)"],
};
