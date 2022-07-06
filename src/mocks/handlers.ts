import book from "./res/book.html";
import bookDetails from "./res/bookDetails.html";
import bookList from "./res/bookList.html";
import * as rest from "./rest";

let idsCounter = 1;

const nextNumber = () => `${idsCounter++}`;
export const handlers = [
  rest.get("/index_book.php", (req, res, ctx) => {
    return res(
      ctx.text(
        bookList
          .replaceAll("103843", nextNumber())
          .replaceAll("103842", nextNumber())
          .replaceAll("103841", nextNumber())
          .replaceAll("103840", nextNumber())
          .replaceAll("103839", nextNumber())
          .replaceAll("103837", nextNumber())
          .replaceAll("103836", nextNumber())
          .replaceAll("103835", nextNumber())
          .replaceAll("103834", nextNumber())
          .replaceAll("103833", nextNumber())
      )
      //   ctx.status(200)
    );
  }),
  rest.get("/view_global.php", (req, res, ctx) => {
    const bookId = req.url.searchParams.get("id");

    return res(
      ctx.text(
        bookDetails
          .replaceAll("{{ title }}", `Title ${bookId}`)
          .replaceAll("{{ genre }}", `Genre ${bookId}`)
      )
      //   ctx.status(200)
    );
  }),
  rest.get("/read_book.php", async (req, res, ctx) => {
    const id = req.url.searchParams.get("id")!;
    const p = req.url.searchParams.get("p")!;

    const currentPageNumber = parseInt(p);

    let nextPage;

    if (currentPageNumber <= 10) {
      nextPage = book.replaceAll("p=2", `p=${currentPageNumber + 1}`);
    } else {
      nextPage = book.replace("Вперед", "");
    }

    nextPage = nextPage.replaceAll("103650", id);

    return res(
      ctx.text(nextPage)
      // ctx.status(200)
    );
  }),
];
