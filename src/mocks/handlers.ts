import { rest } from '../libs/mockService';
import books from './fixtures/available-books.html';
import bookDetails from './fixtures/book-details.html';

export const handlers = [
  rest.get('/index_book.php', async (req, res, ctx) => {
    return await res(ctx.text(books));
  }),
  rest.get('/view_global.php', async (req, res, ctx) => {
    return await res(ctx.text(bookDetails));
  }),
];
