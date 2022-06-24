import { mockServer } from "./modules/mockServer";

afterEach(() => {
  mockServer.resetHandlers();
});
