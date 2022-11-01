import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";

if (__DEV__) {
  const { worker } = require("./mocks/native");
  worker.start();
}

// Must be exported or Fast Refresh won't update the context
export function App() {
  const ctx = require.context("./app/screens");
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);
