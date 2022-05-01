var pkg = require("./package.json");
var name = pkg.name.replace("-ebook-reader", "");

export default {
  name: name,
  slug: name,
  version: pkg.version,
  orientation: "portrait",
  scheme: "bookspace",
  icon: "./assets/images/icon.png",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  packagerOpts: {
    assetExts: ["html"],
  },
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
  },
  web: {
    favicon: "./assets/images/favicon.png",
  },
  extra: {
    isDevelopment: process.env.NODE_ENV === 'development',
  },
};
