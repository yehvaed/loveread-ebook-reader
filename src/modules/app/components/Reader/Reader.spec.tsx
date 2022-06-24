import axios from "@shared/httpClient";
import { render, waitFor } from "@shared/tests";
import * as React from "react";
import { Text } from "react-native";

import { Page } from "../page";
import { Reader } from "./Reader";

jest.mock("@shared/httpClient");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("@components/page");
const mockedPage = Page as jest.MockedFunction<typeof Page>;

describe("<Page/>", () => {
  const renderComponent = () => render(<Reader bookId={0} />);

  it.skip("should render proper information when catch error", () => {});
  it.skip("should render loader when fetching first page data", () => {});

  it("should fetch all pages", async () => {
    mockedPage.mockImplementation(({ pageNumber }) => (
      <Text testID="page">{pageNumber}</Text>
    ));

    mockedAxios.get.mockResolvedValueOnce({
      data: /* html */ `
        <a href="/read_book.php?id=0&p=1" />
        <a href="/read_book.php?id=0&p=1" />
        <a href="/read_book.php?id=0&p=2" />
        <a href="/read_book.php?id=0&p=3" />
      `,
    });

    const { findAllByTestId } = renderComponent();
    const pages = await findAllByTestId("page");

    expect(pages).toHaveLength(3);
    pages.forEach((item, i) => expect(item.children[0]).toEqual(`${i + 1}`));
  });
});
