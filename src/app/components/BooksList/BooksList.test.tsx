import { mockServer, rest } from '@mockserver';
import { render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { BooksList } from './BooksList';

const queryClient = new QueryClient()

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

    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <BooksList />
      </QueryClientProvider>
    )
 
    await waitFor(() =>  {
      expect(getByText("Title")).toBeDefined();
      expect(getByText("Genre")).toBeDefined();
    });
  });
});
