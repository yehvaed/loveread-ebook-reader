import { BookId } from '@typings';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';

import { client } from '../utils/axios';

export const useBook = (bookId: BookId) => {
  const fetchPages = useCallback(
    async ({ pageParam = `/read_book.php?id=${bookId}&p=1` }) => {
      const { data } = await client.get<string>(pageParam);

      const matcher = new RegExp(
        [
          'MsoNormal["]*>([^<]+)',
          '<div class="take_h1"><b>([^<]*)</b></div>',
          '<div class="take_h1">([^<]*)</div>',
        ].join("|"),
        "ig"
      );

      const pages = data
        .match(matcher)
        ?.map((line: string) => line.replace(/&#039;/g, "'"))
        .map((line: string) => line.replace(/&#8210;/g, "-"))
        .map((line: string) => line.replace(new RegExp("<b>|</b>", "gi"), ""))
        .map((line: string) => {
          return line.replace(
            new RegExp('MsoNormal["]*>([^<]*)', "gi"),
            "$1"
          );
        })
        .map((line: string) =>
          line.replace(
            new RegExp('<div[ ]*class="take_h1">([^<]+)</div>', "gi"),
            "# $1"
          )
        );

      const extracted = data.match(
        /<a href=["]*([^"]+)["]*[^>]+>Вперед/
      )?.[1];

      let nextPage = extracted ? `/${extracted}` : undefined;
   
      return { pages, nextPage };
    },
    []
  );

  const query = useInfiniteQuery(["book", bookId], fetchPages, {
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage;
    },
  });

  const { isLoading, fetchNextPage, hasNextPage, data } = query;

  const content = useMemo(() => {
    return data?.pages.flatMap((d) => d.pages) || [];
  }, [data]);

  const loadMore = useCallback(
    () => hasNextPage && fetchNextPage(),
    [hasNextPage]
  );

  const counter = useRef(10);

  useEffect(() => {
    if (!hasNextPage) return;
    loadMore();
  });

  return {
    content,
    loadMore,
  };
};
