import { httpClient } from "@shared/httpClient";
import * as React from "react";

import { render } from "../../../tools/tests";
import { SaveBook } from "./SaveBook";

describe("<SaveBook/>", () => {
  const renderComponent = () => render(<SaveBook bookId={0} />);

  it.skip("should be blank when book is not saved", () => {});
  it.skip("should be filled when book is saved", () => {});
  it.skip("should invoke action on saving book", () => {});
});
