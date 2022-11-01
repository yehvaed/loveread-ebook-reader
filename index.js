import "expo-router/entry";

if (__DEV__) {
  const { worker } = require("./src/mocks/native");
  worker.start();
}
