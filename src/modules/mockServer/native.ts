import { setupServer } from "./adapter";
import { handlers } from "./handlers";

// This module enables requests interception in React Native
// using the same request handlers as in tests.
export const native = setupServer(...handlers);
