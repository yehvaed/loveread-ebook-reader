import { Book } from '@typings';
import React from 'react';
import { Text, View } from 'react-native';

interface BookCardProps {
    book: Book;
}

export const BookCard = ({ book: {title, genre} }: BookCardProps) => (
    <View testID='book-card' style={{ padding: 30 }}>
    <Text style={{ fontSize: 24 }}>{title}</Text>
    <Text style={{ fontSize: 16 }}>{genre}</Text>
</View>
)
