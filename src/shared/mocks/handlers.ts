import { getAsset } from "../assets";
import { rest } from "./adapter";

export const handlers = [
  rest.get("http://loveread.ec/index_book.php", async (req, res, ctx) => {
    const books = await getAsset("books");
    return res(ctx.delay(350), ctx.text(await books));
  }),
  rest.get("http://loveread.ec/read_book.php", async (req, res, ctx) => {
    const { id, p } = req.query;
    const currentPageNumber = parseInt(p);

    let bookContent = await getAsset("book");
    let nextPage;

    if (currentPageNumber <= 10) {
      nextPage = bookContent.replaceAll("p=2", `p=${currentPageNumber + 1}`);
    } else {
      nextPage = bookContent.replace("Вперед", "");
    }

    nextPage = nextPage.replaceAll("103650", id);

    return res(ctx.delay(350), ctx.text(nextPage));
  }),
];
