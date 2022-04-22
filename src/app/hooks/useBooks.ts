import { Book } from '@typings';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';

import { client } from '../utils/axios';

export const useBooks = () => {
  const fetchBooksList = useCallback(
    async ({ pageParam = "/index_book.php?id_genre=1" }) => {
      const { data } = await client.get<string>(pageParam);

      const ids = [...data.matchAll(/view_global\.php\?id=([^#]+)#add_com/g)].map(
        (id) => parseInt(id[1])
      );

      const titles = [
        ...data.matchAll(
          /<div class="td_top_text"><strong>([^<]+)<\/strong><\/div>/g
        ),
      ].map((title) => title[1]);
      const genres = [...data.matchAll(/<p>Жанр ([^<]+)<\/p>/g)].map(
        (title) => title[1]
      );

      const books: Book[] = [];

      for (let i = 0; i < titles.length; i++) {
        books.push({
          id: ids[i],
          title: titles[i],
          genre: genres[i],
          coverUrl: `http://loveread.ec/img/photo_books/${ids[i]}.jpg`
        });
      }

      const nextPage =
        "/" +
        data.match(/href=['"]([^'"]+)['"] title=['"][^'"]+['"]>Вперед/)?.[1];

      return { books, nextPage };
    },
    []
  );

  const query = useInfiniteQuery("booklist", fetchBooksList, {
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage;
    },
  });

  const { isLoading, fetchNextPage, hasNextPage, data } = query;

  const books = useMemo(() => {
    return data?.pages.flatMap((d) => d.books) || [];
  }, [data?.pages.length]);

  const loadMore = useCallback(
    () => hasNextPage && fetchNextPage(),
    [hasNextPage]
  );

  const counter = useRef(10);

  useEffect(() => {
    if (!counter.current) return;
    counter.current -= 1;
    loadMore();
  });

  return {
    books,
    loadMore,
  };
};
