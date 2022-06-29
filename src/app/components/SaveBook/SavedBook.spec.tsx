import axios from "@services/httpClient";
import * as React from "react";

import { render } from "../../../utils/tests";
import { SaveBook } from "./SaveBook";

jest.mock("@services/httpClient");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("<SaveBook/>", () => {
  const renderComponent = () => render(<SaveBook bookId={0} />);

  it.skip("should be blank when book is not saved", () => {});
  it.skip("should be filled when book is saved", () => {});
  it.skip("should invoke action on saving book", () => {});
});
