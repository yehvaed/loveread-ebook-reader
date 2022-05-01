import { book } from './data/book';
import { booksList } from './data/books-list';
import { rest } from './utils/adapter';

export const handlers = [
  rest.get("http://loveread.ec/index_book.php", (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.text(booksList));
  }),
  rest.get("http://loveread.ec/read_book.php", (req, res, ctx) => {
    const { p } = req.query;

    const nextPageNumber = parseInt(p) + 1;

    const response = book({
      nextPageNumber: nextPageNumber <= 10 ? nextPageNumber : undefined
    })

    return res(ctx.delay(1000), ctx.text(response));
  }),
];
