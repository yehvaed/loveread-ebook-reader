import { ConfigContext, ExpoConfig } from "@expo/config";

import packageJson from "./package.json";

const { version } = packageJson;

export const constants = {
  isDevelopment: process.env.NODE_ENV === "development",
};

export default ({ config }: ConfigContext): ExpoConfig => {
  const { isDevelopment } = constants;

  const configuration = {
    ...config,
    packagerOpts: {
      assetExts: ["html"],
    },
    version,
    name: config.scheme!,
    slug: config.scheme!,
    extra: constants,
  };

  return configuration;
};
