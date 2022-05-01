import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

import { rest } from './adapter';

const assets = {
  "../assets/books.mock.html": Asset.fromModule(
    require("../assets/books.mock.html")
  ),
  "../assets/book.mock.html": Asset.fromModule(
    require("../assets/book.mock.html")
  ),
};

const requireAsset = async (assetUri: keyof typeof assets) => {
  const downloadedAsset = await assets[assetUri].downloadAsync();

  let assetContent = await FileSystem.readAsStringAsync(
    downloadedAsset.localUri!
  );

  assetContent = assetContent
    .replace(/[\n\t]*/g, "")
    .replace(/[ ]+/g, " ")
    .replaceAll("&amp;", "&")
    .replaceAll("<i>", "")
    .replaceAll("</i>", "")
    .replaceAll("<b>", "")
    .replaceAll("</b>", "")
    .replace(/(\r\n|\n|\r)/gm, "");

    console.log(assetContent);

  return assetContent;
};

export const handlers = [
  rest.get("http://loveread.ec/index_book.php", async (req, res, ctx) => {
    const books = await requireAsset("../assets/books.mock.html");
    return res(ctx.delay(1000), ctx.text(books));
  }),
  rest.get("http://loveread.ec/read_book.php", async (req, res, ctx) => {
    const { p } = req.query;
    const currentPageNumber = parseInt(p);

    const pattern = `<a href="http://loveread.ec/read_book.php?id=103650&amp;p=2" title="страница 2 | читать книгу бесплатно">Вперед</a>`;
    let bookContent = await requireAsset("../assets/book.mock.html");
    let nextPage;

    if (currentPageNumber <= 10) {
      nextPage = bookContent.replaceAll("p=2", `p=${currentPageNumber + 1}`);
    } else {
      nextPage = bookContent.replace(pattern, `<span>Вперед</span>`);
    }

    return res(ctx.delay(1000), ctx.text(nextPage));
  }),
];
