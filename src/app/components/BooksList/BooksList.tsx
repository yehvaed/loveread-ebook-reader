import React from 'react';
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useInfiniteQuery } from 'react-query';

import { client } from '../../utils/clients';

class Page {
    constructor(private page: string) { }

    public get books() {
        const titles = [...this.page.matchAll(/<div class="td_top_text"><strong>([^<]+)<\/strong><\/div>/g)].map(title => title[1]);
        const genres = [...this.page.matchAll(/<p>Жанр ([^<]+)<\/p>/g)].map(title => title[1]);

        const books = [];

        for (let i = 0; i < titles.length; i++) {
            books.push({
                title: titles[i],
                genre: genres[i]
            })
        }

        return books;
    }

    public get nextPage() {
        return "/" + this.page.match(/href=['"]([^'"]+)['"] title=['"][^'"]+['"]>Вперед/)?.[1]
    }
}

export const BooksList = () => {
    const fetchBooksList = useCallback(async ({ pageParam = "/index_book.php?id_genre=1" }) => {
        const { data } = await client.get<string>(pageParam);
        const page = new Page(data);

        return {
            books: page.books,
            nextPage: page.nextPage
        };
    }, []);


    const query = useInfiniteQuery(
        "booklist",
        fetchBooksList,
        {
            getNextPageParam: (lastPage) => {
                return lastPage.nextPage;
            },
        }
    );

    const { isLoading, fetchNextPage, hasNextPage, data } = query;

    const books = useMemo(() => {
        return data?.pages.flatMap((d) => d.books) || [];
    }, [data?.pages.length]);

    const loadMore = useCallback(
        () => hasNextPage && fetchNextPage(),
        [hasNextPage]
    );

    const counter = useRef(10);

    useEffect(() => {
        if (!counter.current) return;
        counter.current -= 1;
        loadMore();
    })


    return <FlatList
        renderItem={({ item }) =>
            <View style={{ padding: 30 }}>
                <Text style={{ fontSize: 24 }}>{item.title}</Text>
                <Text style={{ fontSize: 16 }}>{item.genre}</Text>
            </View>
        }
        keyExtractor={(_, i) => i + ""}
        data={books}
        onEndReachedThreshold={0.9}
        onEndReached={loadMore}
    />
}