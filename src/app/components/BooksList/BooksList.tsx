import { BookCard } from '@components/BookCard';
import React from 'react';
import { FlatList } from 'react-native';

import { useBooks } from '../../hooks/useBooks';

export const BooksList = () => {
   const { books, loadMore } = useBooks();

    return <FlatList
        renderItem={({ item }) =>
            <BookCard book={item} />
        }
        keyExtractor={(_, i) => i + ""}
        data={books}
        onEndReachedThreshold={0.9}
        onEndReached={loadMore}
    />
}