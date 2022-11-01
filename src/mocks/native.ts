import { httpClient } from '../libs/httpClient/httpClient';
import { createSetupWorker } from '../libs/mockService';

import { handlers } from './handlers';

const setupWorker = createSetupWorker(httpClient);

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers);
