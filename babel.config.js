process.env.EXPO_ROUTER_APP_ROOT="./src/app/screens";

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // NOTE: `expo-router/babel` is a temporary extension to `babel-preset-expo`.
      require.resolve("expo-router/babel"),
      '@babel/plugin-proposal-export-namespace-from',
      'transform-html-import-to-string',
      // 'tsconfig-paths-module-resolver',
    ],
  };
};
