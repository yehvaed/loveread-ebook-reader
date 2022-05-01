import { BookCardTestId } from '@consts';
import { Book, BookId } from '@typings';
import React, { useCallback } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export interface BookCardProps {
    book: Book;
    onPress?: (bookId: BookId) => void;
}

const shadowBox = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 17,
}


export const BookCard = ({ book: { id, title, genre, coverUrl }, onPress }: BookCardProps) => {
    const handlerPress = useCallback(() => {
        onPress?.(id);
    }, [id]);

    return (
        <TouchableOpacity testID={BookCardTestId} onPress={handlerPress}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{
                    ...shadowBox,
                    flex: 0.8
                }}>
                    <Image style={{
                        height: 200,
                        margin: 10,
                        borderRadius: 5
                    }} source={{ uri: coverUrl }} />

                </View>
                <View style={{
                    flex: 1,
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        fontSize: 17,
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                    }}>{title}</Text>
                    <Text>{genre}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
};