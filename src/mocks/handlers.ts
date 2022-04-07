import { booksList } from './data/books-list';
import { rest } from './utils/adapter';

export const handlers = [
  rest.get("http://loveread.ec/index_book.php", (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.text(booksList));
  }),
];
