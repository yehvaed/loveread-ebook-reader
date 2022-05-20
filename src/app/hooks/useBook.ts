import { BookId } from "@typings";
import { client } from "@utils/axios";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useInfiniteQuery } from "react-query";

const getBookContent = (page: string) => {
  const matcher = new RegExp(
    [
      'MsoNormal["]*>([^<]+)',
      '<div class="take_h1"><b>([^<]*)</b></div>',
      '<div class="take_h1">([^<]*)</div>',
    ].join("|"),
    "ig"
  );

  const pages = page
    .match(matcher)
    ?.map((line: string) => line.replace(/&#039;/g, "'"))
    .map((line: string) => line.replace(/&#8210;/g, "-"))
    .map((line: string) => line.replace(new RegExp("<b>|</b>", "gi"), ""))
    .map((line: string) => {
      return line.replace(new RegExp('MsoNormal["]*>([^<]*)', "gi"), "$1");
    })
    .map((line: string) =>
      line.replace(
        new RegExp('<div[ ]*class="take_h1">([^<]+)</div>', "gi"),
        "# $1"
      )
    );

  return pages;
};

const getNextPage = (page: string): string | undefined => {
  const extracted = page.match(/<a href=['"]*([^"']+)['"]*[^<>]+>Вперед/)?.[1];
  const nextPage = extracted ? `/${extracted}` : undefined;

  return nextPage;
};

export const useBook = (bookId: BookId) => {
  const query = useInfiniteQuery(
    ["book", bookId],
    async ({ pageParam = `/read_book.php?id=${bookId}&p=1` }) => {
      const { data: page } = await client.get<string>(pageParam);
      const content = getBookContent(page);
      const nextPage = getNextPage(page);

      return { content, nextPage };
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextPage;
      },
    }
  );

  const { fetchNextPage, hasNextPage, data } = query;

  const content = useMemo(() => {
    return data?.pages.flatMap((d) => d.content) || [];
  }, [data]);

  const loadMore = useCallback(
    () => hasNextPage && fetchNextPage(),
    [hasNextPage]
  );

  useEffect(() => {
    if (!hasNextPage) return;
    loadMore();
  });

  return {
    content,
    loadMore,
  };
};
