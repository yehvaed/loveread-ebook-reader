import { by, element, expect } from "detox";

const { reloadApp } = require("detox-expo-helpers");

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("Main Screen", () => {
  beforeEach(async () => {
    await reloadApp({
      // Optionally, you can also set some parameters when loading the app
      // see https://github.com/wix/Detox/blob/master/docs/APIRef.DeviceObjectAPI.md
      args: {
        disableTouchIndicators: true,
        delete: true,
        url: "exp://127.0.0.1:19000",
      },
      launchArgs: {
        // see https://github.com/wix/Detox/blob/master/docs/APIRef.LaunchArgs.md
      },
    });

    // await waitFor(element(by.id("app")))
    //   .toBeVisible()
    //   .withTimeout(120000);
  });

  // this is mostly example test to check how this works
  it("Check for text on the home screen", async () => {
    await waitFor(element(by.id("books-list")))
      .toBeVisible()
      .withTimeout(50000);

    await expect(element(by.id("books-list"))).toBeVisible();
  });
});
