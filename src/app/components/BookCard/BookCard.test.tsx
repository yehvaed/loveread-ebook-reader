import { render, waitFor } from '@tests/utils';
import { Book } from '@typings';
import React from 'react';

import { BookCard } from './BookCard';



describe('<BookCard />', () => {
  it('should render books with minimal ammount of details', async () => {
    const book: Book = {
      title: "Test Title",
      genre: "Test Genre"
    }

    const { getByText } = render(
        <BookCard book={book}/>
    )
 
    await waitFor(() =>  {
      expect(getByText("Test Title")).toBeDefined();
      expect(getByText("Test Genre")).toBeDefined();
    });
  });
});
