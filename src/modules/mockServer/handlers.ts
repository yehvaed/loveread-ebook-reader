import { rest } from "./adapter";
import { getAsset } from "./assets";

let idsCounter = 500;

export const handlers = [
  rest.get("http://loveread.ec/index_book.php", async (req, res, ctx) => {
    const books = await getAsset("books");
    const content = await books;

    const nextNumber = () => `${idsCounter++}`;

    const modifiedContent = content
      .replaceAll("103843", nextNumber())
      .replaceAll("103842", nextNumber())
      .replaceAll("103841", nextNumber())
      .replaceAll("103840", nextNumber())
      .replaceAll("103839", nextNumber())
      .replaceAll("103837", nextNumber())
      .replaceAll("103836", nextNumber())
      .replaceAll("103835", nextNumber())
      .replaceAll("103834", nextNumber())
      .replaceAll("103833", nextNumber());

    return res(ctx.delay(350), ctx.text(modifiedContent));
  }),
  rest.get("http://loveread.ec/view_global.php", async (req, res, ctx) => {
    const { id } = req.query;
    const details = await getAsset("details");
    const content = await details;

    const modifiedContent = content
      .replaceAll("{{ title }}", `Title ${id}`)
      .replaceAll("{{ genre }}", `Genre ${id}`);

    return res(ctx.delay(350), ctx.text(modifiedContent));
  }),
  rest.get("http://loveread.ec/read_book.php", async (req, res, ctx) => {
    const { id, p } = req.query;
    const currentPageNumber = parseInt(p);

    const bookContent = await getAsset("book");
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
