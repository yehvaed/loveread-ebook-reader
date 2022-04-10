import { mockServer, rest } from '@mockserver';
import { render, waitFor } from '@tests/utils';
import React from 'react';

import { BooksList } from './BooksList';



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
 
    await waitFor(() =>  {
      expect(getAllByTestId("book-card")).toHaveLength(1);
    });
  });
});
