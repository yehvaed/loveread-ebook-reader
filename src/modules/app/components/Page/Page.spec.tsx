import axios from "@shared/httpClient";
import { render, waitFor } from "@shared/tests";
import * as React from "react";

import { Page } from "./Page";

jest.mock("@shared/httpClient");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("<Page/>", () => {
  const renderComponent = () => render(<Page bookId={0} pageNumber={0} />);

  it.skip("should throw exception when there is network error", () => {});

  it("should render all content", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: /* html */ `
        <div class="MsoNormal">chapter<div> 
        <div class="take_h1">text line</div>
      `,
    });

    const { getByText, findAllByA11yRole } = renderComponent();
    await findAllByA11yRole("text");

    expect(getByText("chapter")).toBeDefined();
    expect(getByText("text line")).toBeDefined();
  });
});
