import { LOVEREAD_URL } from "@consts";
import axios from "@services/httpClient";
import { useMemo } from "react";
import { useQuery } from "react-query";

type UseBookMetadataType = (bookId: BookId) => Nullable<Book>;

export const useBookMetadata: UseBookMetadataType = (bookId) => {
  const { data } = useQuery(["book", bookId, "page", 0], () => {
    return axios.get<string>(`/view_global.php?id=${bookId}`);
  });

  const details = useMemo(() => {
    const book = data?.data;
    if (!book) return undefined;

    const title = book.match(
      /<span>Название: <\/span><strong>([^<]+)<\/strong>/
    )?.[1];

    if (!title) return undefined;

    const genre = book.match(/<p>Жанр ([^<]+)<\/p>/)?.[1];

    const coverUrl = `${LOVEREAD_URL}/img/photo_books/${bookId}.jpg`;

    return { id: bookId, title, genre, coverUrl };
  }, [data?.data]);

  return details;
};
