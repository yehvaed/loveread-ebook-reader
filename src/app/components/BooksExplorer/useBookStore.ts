import { httpClient } from "@shared/httpClient";
import _ from "lodash";
import { useMemo } from "react";
import { useInfiniteQuery } from "react-query";

interface UseBookStoreReturnType {
  books: Book["id"][];
  loadMore: () => void;
}

type UseBookStoreType = () => UseBookStoreReturnType;

interface BooksStoreQueryResult {
  ids: number[];
  nextPage: string | undefined;
}

const getNextPage = (page: string): string | undefined => {
  const extracted = page.match(/<a href=['"]*([^"']+)['"]*[^<>]+>Вперед/)?.[1];
  const nextPage = extracted ? `${extracted}` : undefined;
  return nextPage;
};

const getIdsFromPage = (page: string): number[] => {
  const captureIds = [...page.matchAll(/view_global\.php\?id=([^'"]+)/g)].map(
    (id) => parseInt(id[1], 10)
  );

  return _.uniq(captureIds);
};

export const useBookStore: UseBookStoreType = () => {
  const { data: fetchedIds, fetchNextPage: loadMore } =
    useInfiniteQuery<BooksStoreQueryResult>(
      "books-explorer-list",
      async ({ pageParam = "index_book.php?id_genre=1" }) => {
        const { data: page } = await httpClient.get<string>(`/${pageParam}`);

        const ids = getIdsFromPage(page);
        const nextPage = getNextPage(page);

        return { ids, nextPage };
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextPage;
        },
      }
    );

  const booksIds = useMemo(
    () => _.flatMap(fetchedIds?.pages, (n) => n.ids),
    [fetchedIds]
  );

  return {
    books: booksIds,
    loadMore,
  };
};
