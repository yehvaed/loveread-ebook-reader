import { isDevelopment } from "@consts";
import { registerRootComponent } from "expo";

import App from "./modules/app/App";

if (isDevelopment) {
  require("react-native-url-polyfill/auto");
  const { mockServer } = require("./modules/mockServer");
  mockServer.listen();
}

registerRootComponent(App);
