import { ConfigContext, ExpoConfig } from "@expo/config";

import packageJson from "./package.json";

const { version } = packageJson;

export const constants = {};

export default ({ config }: ConfigContext): ExpoConfig => {
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
