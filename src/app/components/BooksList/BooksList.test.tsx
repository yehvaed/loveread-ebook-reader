import { BookCardProps } from '@components/BookCard';
import { BookCardTestId } from '@consts';
import { mockServer, rest } from '@mockserver';
import { act, fireEvent, render, waitFor } from '@tests';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { BooksList } from './BooksList';

jest.mock("@components/BookCard", () => ({
  BookCard: ({ book, onPress }: BookCardProps) => (
    <TouchableOpacity testID={BookCardTestId} onPress={() => onPress?.(book.id)}>
      <Text>{book.title} {book.genre} {book.coverUrl}</Text>
    </TouchableOpacity>
  )
}))


describe('<BooksList />', () => {
  it('should render list of books', async () => {
    mockServer.use(
      rest.get("http://loveread.ec/index_book.php", (req, res, ctx) => {
        return res(ctx.text(`
        <div class="td_top_text"><strong>Title<\/strong><\/div>
        <p>Жанр Genre<\/p>
        `));
      }),
    )

    const { getAllByTestId } = render(
      <BooksList />
    )

    await waitFor(() => {
      expect(getAllByTestId(BookCardTestId)).toHaveLength(1);
    });
  });

  it('should allow to press any card', async () => {
    mockServer.use(
      rest.get("http://loveread.ec/index_book.php", (req, res, ctx) => {
        return res(ctx.text(`
        <div class="td_top_text"><strong>Title<\/strong><\/div>
        <a href="view_global.php?id=0#add_com" \/>
        <p>Жанр Genre<\/p>
        `));
      }),
    )

    const handlePress = jest.fn();

    const { getAllByTestId } = render(
      <BooksList onBookPressed={handlePress} />
    )

    await waitFor(() => {
      const elements = getAllByTestId(BookCardTestId);
      const randomElements = elements[Math.floor(Math.random() * 100) % elements.length];
  
  
      act(() => {
        fireEvent.press(randomElements);
      })
      
      expect(handlePress).toBeCalledTimes(1);
      expect(handlePress).toBeCalledWith(0);
    });
  });
});
