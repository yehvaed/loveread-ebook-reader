import { Page } from "@components/Page";
import { TestId } from "@consts";
import * as _ from "lodash";
import * as React from "react";
import { FC } from "react";
import {
  FlatList as List,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
} from "react-native";

import { usePageCount } from "./usePageCount";

interface ReaderProps {
  onLongPress?: () => void;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  bookId: number;
}

export const Reader: FC<ReaderProps> = ({ bookId, onLongPress, onScroll }) => {
  const pageNumber = usePageCount(bookId);

  return (
    <List
      style={{ backgroundColor: "white" }}
      renderItem={({ item: pageNumber }) => (
        <Pressable testID={TestId.Page} onLongPress={onLongPress}>
          <Page
            key={`${bookId}-${pageNumber}`}
            bookId={bookId}
            pageNumber={pageNumber}
          />
        </Pressable>
      )}
      onScroll={(event) => {
        onScroll?.(event);
      }}
      keyExtractor={(pageNumber) => `${bookId}-${pageNumber}`}
      data={pageNumber}
    />
  );
};
