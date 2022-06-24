import { Page } from "@components/page";
import * as _ from "lodash";
import * as React from "react";
import { FC } from "react";
import { ScrollView } from "react-native";

import { usePageCount } from "./usePageCount";

interface ReaderProps {
  bookId: number;
}

export const Reader: FC<ReaderProps> = ({ bookId }) => {
  const range = usePageCount(bookId);

  return (
    <ScrollView>
      {range.map((pageNumber) => (
        <Page
          key={`${bookId}-${pageNumber}`}
          bookId={bookId}
          pageNumber={pageNumber}
        />
      ))}
    </ScrollView>
  );
};
