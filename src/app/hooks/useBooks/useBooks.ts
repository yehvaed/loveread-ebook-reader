import { Book } from "@typings";
import { client } from "@utils/axios";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useInfiniteQuery, useQueryClient } from "react-query";

const getBooks = (page: string): Book[] => {
  const ids = [...page.matchAll(/photo_books\/([^\.]+).jpg/g)].map((id) =>
    parseInt(id[1])
  );

  const titles = [
    ...page.matchAll(
      /<div class="td_top_text"><strong>([^<]+)<\/strong><\/div>/g
    ),
  ].map((title) => title[1]);
  const genres = [...page.matchAll(/<p>Жанр ([^<]+)<\/p>/g)].map(
    (title) => title[1]
  );

  const books: Book[] = [];

  for (let i = 0; i < titles.length; i++) {
    books.push({
      id: ids[i],
      title: titles[i],
      genre: genres[i],
      coverUrl: `http://loveread.ec/img/photo_books/${ids[i]}.jpg`,
    });
  }

  return books;
};

const getNextPage = (page: string): string | undefined => {
  const extracted = page.match(/<a href=['"]*([^"']+)['"]*[^<>]+>Вперед/)?.[1];
  const nextPage = extracted ? `/${extracted}` : undefined;

  return nextPage;
};

export const useBooks = () => {
  const queryClient = useQueryClient();

  const query = useInfiniteQuery(
    "booklist",
    async ({ pageParam = "/index_book.php?id_genre=1" }) => {
      const { data: page } = await client.get<string>(pageParam);
      const books = getBooks(page);
      const nextPage = getNextPage(page);

      return { books, nextPage };
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextPage;
      },
    }
  );

  const { isFetching, fetchNextPage, hasNextPage, data } = query;

  const books = useMemo(() => {
    return data?.pages.flatMap((d) => d.books) || [];
  }, [data]);

  const loadMore = useCallback(
    () => hasNextPage && fetchNextPage(),
    [hasNextPage]
  );

  const refresh = () => queryClient.invalidateQueries("booklist");

  return {
    refresh,
    isLoading: isFetching,
    books,
    loadMore,
  };
};
