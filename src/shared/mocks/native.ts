import { handlers } from './handlers';
import { setupServer } from './utils/adapter';

// This module enables requests interception in React Native
// using the same request handlers as in tests.
export const native = setupServer(...handlers)