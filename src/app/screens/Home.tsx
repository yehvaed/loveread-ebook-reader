import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BookCard } from '../components/BookCard';

export const Home = () => {
    const [booksUris, setBooksUris] = useState([
        "http://loveread.ec/view_global.php?id=101907"
    ]);


    return (
        <SafeAreaView testID='bookcard'>
            {booksUris.map(uri => <BookCard key={uri} uri={uri}/>)}
        </SafeAreaView>
    )
}