import { registerRootComponent } from "expo";

import { App } from "./app";
import { mockServer } from "./mocks";

// eslint-disable-next-line no-undef
if (__DEV__) {
  mockServer.start();
}

registerRootComponent(App);
