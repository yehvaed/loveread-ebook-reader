import axios from "@shared/httpClient";
import _ from "lodash";
import { useMemo } from "react";
import { useQuery } from "react-query";

type usePageCountType = (bookId: BookId) => number[];

const getCountPage = (page: string): number => {
  const captureIds = [
    ...page.matchAll(/read_book\.php\?id=[0-9]+&[^=]+=([0-9]+)/g),
  ].map((id) => parseInt(id[1], 10));

  return _.max(captureIds) || 0;
};

export const usePageCount: usePageCountType = (bookId) => {
  const { data: firstPage } = useQuery(
    ["book", bookId, "page", 1],
    async () => {
      const { data: page } = await axios.get<string>(
        `/read_book.php?id=${bookId}&p=1`
      );

      return page;
    }
  );

  const range = useMemo(() => {
    const count = getCountPage(firstPage || "");
    return _.range(1, count + 1);
  }, [firstPage]);

  return range;
};
