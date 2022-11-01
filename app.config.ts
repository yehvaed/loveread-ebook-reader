import { ConfigContext, ExpoConfig } from '@expo/config';

import packageJson from './package.json';

const { version } = packageJson;

export const constants = {};

export default ({ config }: ConfigContext): ExpoConfig => {
  const configuration = {
    ...config,
    packagerOpts: {
      assetExts: ['html'],
    },
    version,
    scheme: config.name!,
    slug: config.name!,
    extra: constants,
  };

  return configuration;
};
