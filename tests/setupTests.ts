import { cleanup, init } from "detox";

const adapter = require("detox/runners/jest/adapter");

const config = require("../.detoxrc.json");

const { reloadApp } = require("detox-expo-helpers");

jest.setTimeout(100000);
jasmine.getEnv().addReporter(adapter);

beforeAll(async () => {
  await init(config, { reuse: true });
});

beforeEach(async () => {
  await adapter.beforeEach();
});

afterAll(async () => {
  await adapter.afterAll();
  await cleanup();
});
