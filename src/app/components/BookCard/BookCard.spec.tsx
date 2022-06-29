import { TestId } from "@consts";
import axios from "@services/httpClient";
import * as React from "react";

import { render } from "../../../utils/tests";
import { BookCard } from "./BookCard";

jest.mock("@services/httpClient");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("<BookCard/>", () => {
  const renderComponent = () => render(<BookCard id={0} />);

  it("should not render when there is network error", () => {
    mockedAxios.get.mockRejectedValue("error");
    const { toJSON } = renderComponent();
    expect(toJSON()).toBeNull();
  });

  it("should not render when invalid data fetched", () => {
    mockedAxios.get.mockResolvedValue("");
    const { toJSON } = renderComponent();
    expect(toJSON()).toBeNull();
  });

  it("should render details when valid data fetched", async () => {
    const title = "Title with multiple words and spaces";
    const genre = "Genre with multiple words and spaces";

    mockedAxios.get.mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              data: /* html */ `
         <span>Название: </span><strong>${title}</strong>
         <p>Жанр ${genre}</p>
         `,
            });
          }, 400);
        })
    );

    const { findByTestId, getByText } = renderComponent();
    await findByTestId(TestId.BookCard);

    expect(getByText(title)).toBeDefined();
    expect(getByText(genre)).toBeDefined();
  });
});
