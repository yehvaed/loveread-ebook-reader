import { cleanup, init } from "detox";

const { reloadApp } = require("detox-expo-helpers");
const adapter = require("detox/runners/jest/adapter");

const config = require("../.detoxrc.json");

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
