import { httpClient } from "@shared/httpClient";
import AxiosMockAdapter from "axios-mock-adapter";

import { handlers } from "./handlers";

export const start = () => {
  const mock = new AxiosMockAdapter(httpClient);

  const registerHandler = (handler: any) => {
    handler(mock);
  };

  handlers.forEach(registerHandler);
};
