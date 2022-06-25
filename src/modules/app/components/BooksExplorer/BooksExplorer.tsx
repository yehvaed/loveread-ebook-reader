import { BookCard } from "@components/BookCard";
import { TestId } from "@consts";
import * as React from "react";
import { FC } from "react";
import { FlatList as List } from "react-native";

import { useBookStore } from "./useBookStore";

export interface BooksExplorerProps {
  onPressedBook?: (bookId: number) => void;
}

export const BooksExplorer: FC<BooksExplorerProps> = ({ onPressedBook }) => {
  const { books, loadMore } = useBookStore();

  return (
    <List
      testID={TestId.BookExplorer}
      renderItem={({ item }) => <BookCard id={item} onPress={onPressedBook} />}
      keyExtractor={(item) => `${item}`}
      onEndReached={() => loadMore()}
      data={books}
    />
  );
};
