import { BookCardTestId } from '@consts';
import { fireEvent, render } from '@tests';
import { Book } from '@typings';
import React from 'react';

import { BookCard } from './BookCard';

describe('<BookCard />', () => {
  const book: Book = {
    id: 0,
    title: "Test Title",
    genre: "Test Genre",
  }

  it('should render books with minimal ammount of details', () => {
    const { getByText } = render(
        <BookCard book={book}/>
    )
 
  
      expect(getByText("Test Title")).toBeDefined();
      expect(getByText("Test Genre")).toBeDefined();
  });

  it('should be pressable', () => {
    const handlePress = jest.fn();

    const {getByTestId } = render(
        <BookCard book={book} onPress={handlePress}/>
    )

    fireEvent.press(getByTestId(BookCardTestId))
 
    expect(handlePress).toBeCalledTimes(1);
    expect(handlePress).toBeCalledWith(book.id);
  });
});
