import { queryClient } from "@utils/query";

import { mockServer } from "./shared/mocks";

afterEach(() => {
  mockServer.resetHandlers();
  queryClient.clear();
});
