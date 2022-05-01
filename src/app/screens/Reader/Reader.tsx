import { BookReader } from '@components/BookReader/BookReader';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@typings';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

type ReaderProps = NativeStackScreenProps<RootStackParamList, 'Reader'>

export const Reader = ({route}: ReaderProps) => {
    const { bookId } = route.params;

    return (
        <SafeAreaView>
            <BookReader bookId={bookId}/>
        </SafeAreaView>
    )
}