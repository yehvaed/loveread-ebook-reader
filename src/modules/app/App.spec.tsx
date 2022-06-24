import axios from "@shared/httpClient";
import { render } from "@shared/tests";
import * as React from "react";

import App from "./App";

jest.mock("@shared/httpClient");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("<App/>", () => {
  const renderScreen = () => render(<App />);

  it.skip("should load more book when scrolled down", () => {});
  it.skip("should refresh page when pulled up", () => {});
  it.skip("should open reader when book pressed", () => {});
});
