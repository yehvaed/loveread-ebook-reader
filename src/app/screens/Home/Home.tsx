import { BooksList } from '@components/BooksList';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';


export const Home = () => {
    return (
        <SafeAreaView>
            <BooksList />
        </SafeAreaView>
    )
}