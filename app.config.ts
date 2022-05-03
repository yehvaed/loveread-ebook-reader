import { ConfigContext, ExpoConfig } from "@expo/config";

import packageJson from "./package.json";

const { version } = packageJson;

const extra = {
  isDevelopment: process.env.NODE_ENV === "development",
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  version,
  name: config.scheme!,
  slug: config.scheme!,
  extra,
});
