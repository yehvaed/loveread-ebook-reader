import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';


interface BookCardProps {
    uri: string;
}

interface BookCardState {
    title: string;
}

export const BookCard = ({ uri }: BookCardProps) => {
    const [details, setDetails] = useState<BookCardState>();

    useEffect(() => {
        async function fetchBookDetails() {
            // TODO: normalise url to point into details page
            // TODO: save download html somewhere
            console.log("hello")
            const { data } = await axios.get<string>(uri);
            console.log(data)

            const title = data.match(/Онлайн книга - ([^<]*)/)?.[1];
            if (!title) return;

            // TODO: extract genre
            // TODO: compute link to image

            setDetails({ title })
        }

        fetchBookDetails();
    }, [])

    if (!details) return null;

    return (
        <Text testID='bookcard'>{details.title}</Text>
    )
}