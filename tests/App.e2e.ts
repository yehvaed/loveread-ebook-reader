import { by, element, expect } from "detox";

const { reloadApp } = require("detox-expo-helpers");

describe("Main Screen", () => {
  beforeEach(async () => {
    await reloadApp();
  });

  // this is mostly example test to check how this works
  it("Check for text on the home screen", async () => {
    await waitFor(element(by.id("books-list")))
      .toBeVisible()
      .withTimeout(50000);

    await expect(element(by.id("books-list"))).toBeVisible();
  });
});
