import { Page } from "@components/page";
import * as _ from "lodash";
import * as React from "react";
import { FC } from "react";
import { FlatList as List } from "react-native";

import { usePageCount } from "./usePageCount";

interface ReaderProps {
  bookId: number;
}

export const Reader: FC<ReaderProps> = ({ bookId }) => {
  const pageNumber = usePageCount(bookId);

  return (
    <List
      renderItem={({ item: pageNumber }) => (
        <Page
          key={`${bookId}-${pageNumber}`}
          bookId={bookId}
          pageNumber={pageNumber}
        />
      )}
      keyExtractor={(pageNumber) => `${bookId}-${pageNumber}`}
      data={pageNumber}
    />
  );
};
