import { BookCard } from "@components/BookCard";
import { BookId } from "@typings";
import React from "react";
import { FlatList } from "react-native";

import { useBooks } from "../../hooks/useBooks";

interface BooksListProps {
  onBookPressed?: (bookId: BookId) => void;
}

export const BooksList = ({ onBookPressed }: BooksListProps) => {
  const { isLoading, books, loadMore, refresh } = useBooks();

  return (
    <FlatList
      testID="books-list"
      renderItem={({ item }) => (
        <BookCard book={item} onPress={onBookPressed} />
      )}
      keyExtractor={(_, i) => i + ""}
      data={books}
      onEndReachedThreshold={0.9}
      onEndReached={loadMore}
      refreshing={isLoading}
      onRefresh={() => refresh()}
    />
  );
};
