import { useNavigation } from "@react-navigation/native";
import { httpClient } from "@shared/httpClient";
import * as React from "react";
import { Text } from "react-native";

import { render } from "../../../tools/tests";
import { Page } from "../Page";
import { SaveBook } from "../SaveBook";
import { Reader } from "./Reader";

jest.mock("@shared/httpClient");
const mockedAxios = httpClient as jest.Mocked<typeof httpClient>;

jest.mock("@components/Page");
const mockedPage = Page as jest.MockedFunction<typeof Page>;

jest.mock("@components/SaveBook");
const mockedSaveBook = SaveBook as jest.MockedFunction<typeof SaveBook>;

jest.mock("@react-navigation/native");
const mockUseNavigation = useNavigation as jest.MockedFunction<
  typeof useNavigation
>;

describe("<Page/>", () => {
  const renderComponent = () => render(<Reader bookId={0} />);

  it.skip("should render proper information when catch error", () => {});
  it.skip("should render loader when fetching first page data", () => {});

  it("should fetch all pages", async () => {
    mockedPage.mockImplementation(({ pageNumber }) => (
      <Text testID="test">{pageNumber}</Text>
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
    const pages = await findAllByTestId("test");

    expect(pages).toHaveLength(3);
    pages.forEach((item, i) => expect(item.children[0]).toEqual(`${i + 1}`));
  });

  it.skip("should show header when long press on page", async () => {});
  it.skip("should hide header when start scrolling", () => {});
  it.skip("should restore progress was saved", () => {});
  it.skip("should save book progress when click on icon", () => {});
  it.skip("should save progress continuously when book was saved", () => {});
});
