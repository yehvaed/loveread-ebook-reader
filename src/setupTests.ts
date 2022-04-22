import { queryClient } from '@utils/query';

import { mockServer } from './mocks';

afterEach(() => {
    mockServer.resetHandlers();
    queryClient.clear()
});