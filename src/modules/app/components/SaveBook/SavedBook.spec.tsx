import axios from "@shared/httpClient";
import { render } from "@shared/tests";
import * as React from "react";

import { SaveBook } from "./SaveBook";

jest.mock("@shared/httpClient");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("<SaveBook/>", () => {
  const renderComponent = () => render(<SaveBook bookId={0} />);

  it.skip("should be blank when book is not saved", () => {});
  it.skip("should be filled when book is saved", () => {});
  it.skip("should invoke action on saving book", () => {});
});
