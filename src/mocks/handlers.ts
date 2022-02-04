import bookDetails from './data/book-details';
import { rest } from './utils/adapter';

export const handlers = [
    rest.get("http://loveread.ec/view_global.php?id=101907", (req, res, ctx)  => {
        return res(ctx.text(bookDetails))
    })
]