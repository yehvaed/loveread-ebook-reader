import axios from "@shared/httpClient";
import { useMemo } from "react";
import { useQuery } from "react-query";

type UseBookStoreType = (bookId: BookId, page: number) => Nullable<string[]>;

export const usePage: UseBookStoreType = (bookId, page) => {
  const { data: bookPage } = useQuery(
    ["book", bookId, "page", page],
    async () => {
      const { data: bookPage } = await axios.get<string>(
        `/read_book.php?id=${bookId}&p=${page}`
      );

      return bookPage;
    }
  );

  const content = useMemo(() => {
    const matcher = new RegExp(
      [
        'MsoNormal["]*>([^<]+)',
        '<div class="take_h1"><b>([^<]*)</b></div>',
        '<div class="take_h1">([^<]*)</div>',
      ].join("|"),
      "ig"
    );

    const pages = bookPage
      ?.match(matcher)
      ?.map((line: string) =>
        line.replace(new RegExp('MsoNormal["]*>([^<]*)', "gi"), "$1")
      )
      .map((line: string) =>
        line.replace(
          new RegExp('<div[ ]*class="take_h1">([^<]+)</div>', "gi"),
          "# $1"
        )
      );

    return pages;
  }, [bookPage]);

  return content;
};
