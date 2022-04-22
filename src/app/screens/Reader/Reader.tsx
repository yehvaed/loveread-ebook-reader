import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@typings';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ReaderProps = NativeStackScreenProps<RootStackParamList, 'Reader'>

export const Reader = ({route}: ReaderProps) => {
    const { bookId } = route.params;
    return (
        <SafeAreaView>
            <Text>{bookId}</Text>
        </SafeAreaView>
    )
}