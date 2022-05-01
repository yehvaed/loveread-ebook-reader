import { BookId } from '@typings';
import React from 'react';
import { FlatList, Text, View } from 'react-native';

import { useBook } from '../../hooks/useBook';

interface BooksListProps {
    bookId: BookId;
}



export const BookReader = ({ bookId }: BooksListProps) => {
    const { content, loadMore } = useBook(bookId);
    return <FlatList
        key={bookId}
        renderItem={({ item }) => {
            const isChapter = item?.includes("#");
            const text = item?.replace("# ", "");

            if (isChapter) {
                return <View>
                    <Text style={{
                        paddingTop: 50,
                        paddingRight: 0,
                        paddingBottom: 10,
                        paddingLeft: 0,
                        fontWeight: 'bold',
                        fontSize: 27,
                        textAlign: 'center',
                        fontStyle: 'italic',
                    }}>{text}</Text>
                </View>
            }

            return <View>
                <Text style={{
                    paddingTop: 10,
                    paddingRight: 25,
                    paddingBottom: 10,
                    paddingLeft: 25,
                    lineHeight: 30,
                    fontWeight: '400',
                    fontSize: 19
                }}>{text}</Text>
            </View>
        }}
        keyExtractor={(_, i) => i + ""}
        data={content}
        onEndReachedThreshold={0.9}
        onEndReached={loadMore}
    />
}