import { httpClient } from "@shared/httpClient";
import * as React from "react";
import { Text } from "react-native";

import { render } from "../../../tools/tests";
import { BookCard } from "../BookCard";
import { BooksExplorer } from "./BooksExplorer";

jest.mock("@shared/httpClient");
const mockedAxios = httpClient as jest.Mocked<typeof httpClient>;

jest.mock("@components/BookCard");
const mockedBookCard = BookCard as jest.MockedFunction<typeof BookCard>;

describe("<BookExplorer/>", () => {
  const renderComponent = () => render(<BooksExplorer />);

  it.skip("should render proper information when there is network error", () => {});
  it.skip("should render loader when fetching data", () => {});

  it("should render list item with their ids", async () => {
    mockedBookCard.mockImplementation(({ id }) => (
      <Text testID="list-item">{id}</Text>
    ));

    mockedAxios.get.mockResolvedValueOnce({
      data: /* html */ `
        <a href="view_global.php?id=0" />
        <a href="view_global.php?id=1" />
      `,
    });

    const { findAllByTestId } = renderComponent();
    const items = await findAllByTestId("list-item");

    expect(items).toHaveLength(2);
    items.forEach((item, i) => expect(item.children[0]).toEqual(`${i}`));
  });

  it.skip("should render more list item when more data requested", () => {});
});
