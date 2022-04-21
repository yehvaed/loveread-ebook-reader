import { Book } from '@typings';
import React from 'react';
import { Image, Text, View } from 'react-native';

interface BookCardProps {
    book: Book;
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


export const BookCard = ({ book: { title, genre, coverUrl } }: BookCardProps) => (
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
                fontSize: 14,
                fontWeight: 'bold'
            }}>{title}</Text>
            <Text>{genre}</Text>
        </View>
    </View>
);