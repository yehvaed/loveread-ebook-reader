const tsconfig = require("./tsconfig.json");
const paths = tsconfig.compilerOptions.paths;

const aliases = Object.keys(paths).reduce((aliases, key) => {
  // FIXME: it looks ugly, maybe additional variable, ifs
  const newKey = `^${key.replace("/*", "(.*)")}$`;
  const newValue =
    paths[key][0].replace("/*", "").replace(".", "<rootDir>") +
    (newKey.replace(/[\^\$]/g, "") != key ? "$1" : "");

  aliases[newKey] = newValue;
  return aliases;
}, {});

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  testEnvironment: "jsdom",
  preset: "jest-expo",
  testMatch: ["**/?(*.)+(spec|test).ts?(x)"],
  snapshotResolver: "./snapshot.config.js",
  moduleFileExtensions: ["js", "ts", "tsx"],
  moduleNameMapper: aliases,
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|sentry-expo|native-base)",
  ],
  transform: {
    "^.+\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js",
    "^.+\\.tsx?$": "ts-jest",
  },
  coverageReporters: ["json-summary", "text", "lcov"],
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    // don't collect coverage from e2e tests
    "!**/*.e2e.{ts,tsx}",
    // don't collect coverage from unit tests
    "!**/*.spec.{ts,tsx}",
    "!**/*.integration.spec.{ts,tsx}",
    "!**/setupTests.ts",
    "!**/index.ts",
    "!**/mocks/{handlers,native}.ts",
    "!**/app.config.ts",
    "!**/coverage/**",
    "!**/node_modules/**",
    "!**/babel.config.js",
    "!**/jest.setup.js",
  ],
  coverageThreshold: {
    global: {
      lines: 72.57,
      statements: 73.64,
      branches: 56.25,
      functions: 51.42,
    },
  },
  collectCoverage: true,
  globals: {
    "ts-jest": {
      tsconfig: {
        jsx: "react",
      },
    },
  },
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "<rootDir>/src/setupTests.ts",
  ],
};
