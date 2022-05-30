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
  moduleNameMapper: aliases,
  globals: {
    "ts-jest": {
      tsconfig: {
        jsx: "react",
      },
    },
  },
  transform: {
    "^.+\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js",
    "^.+\\.tsx?$": "ts-jest",
  },
  testMatch: ["**/?(*.)+(spec|test).ts?(x)"],
  coverageThreshold: {
    global: {
      lines: 1,
      statements: 1.71,
      branches: 1,
      functions: 1.46,
    },
  },
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    // don't collect coverage from e2e tests
    "!**/*.e2e.{ts,tsx}",
    // don't collect coverage from unit tests
    "!**/*.test.{ts,tsx}",
    "!**/setupTests.ts",
    "!**/index.ts",
    "!**/mocks/{handlers,native}.ts",
    "!**/app.config.ts",
    "!**/coverage/**",
    "!**/node_modules/**",
    "!**/babel.config.js",
    "!**/jest.setup.js",
  ],
  moduleFileExtensions: ["js", "ts", "tsx"],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|sentry-expo|native-base)",
  ],
  coverageReporters: ["json-summary", "text", "lcov"],
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "<rootDir>/src/setupTests.ts",
  ],
};
