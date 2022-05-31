const tsconfig = require("./tsconfig.json");
const paths = tsconfig.compilerOptions.paths;

const aliases = Object.keys(paths).reduce((aliases, key) => {
  const newKey = key.replace("/*", "");
  const newValue = paths[key][0].replace("/*", "");

  aliases[newKey] = newValue;
  return aliases;
}, {});

const extensions = [".js", ".jsx", ".ts", ".tsx"];

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: aliases,
          extensions,
        },
      ],
    ],
  };
};
