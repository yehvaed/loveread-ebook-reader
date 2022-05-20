import { mockServer } from "@mockserver";
import { rest } from "@mockserver/adapter";
import { act, renderHook } from "@tests";
import { Book } from "@typings";
import React from "react";

import { useBooks } from "./useBooks";

describe("useBooks", () => {
  it("should return parsed books from fetched pages", async () => {
    mockServer.use(
      rest.get("http://loveread.ec/index_book.php", (req, res, ctx) => {
        return res(
          ctx.text(/* html */ `
          <table>
            <img align="left" class="margin-right_8"
              src="img/photo_books/1.jpg" title="genre"
              alt="genre"/>
            <p>Жанр genre</p>
            <div class="td_top_text"><strong>title</strong></div>
          </table>
        `)
        );
      })
    );

    const { result, waitFor } = renderHook(() => useBooks());

    await waitFor(() => result.current.books.length > 0);

    const expectedBooks: Book[] = [
      {
        id: 1,
        title: "title",
        genre: "genre",
        coverUrl: `http://loveread.ec/img/photo_books/1.jpg`,
      },
    ];

    expect(result.current.books).toStrictEqual(expectedBooks);
  });

  it("should be able to load more books", async () => {
    mockServer.use(
      rest.get("http://loveread.ec/index_book.php", (req, res, ctx) => {
        return res(
          ctx.text(/* html */ `
          <table>
            <img align="left" class="margin-right_8"
              src="img/photo_books/1.jpg" title="genre"
              alt="genre"/>
            <p>Жанр genre</p>
            <div class="td_top_text"><strong>title</strong></div>
          </table>
          <a href='index_book.php?id_genre=1&amp;p=17307' title='title'>Вперед</a>
        `)
        );
      })
    );

    const book: Book = {
      id: 1,
      title: "title",
      genre: "genre",
      coverUrl: `http://loveread.ec/img/photo_books/1.jpg`,
    };

    const { result, waitFor } = renderHook(() => useBooks());
    await waitFor(() => result.current.books.length > 0);

    expect(result.current.books).toStrictEqual([book]);

    await act(async () => {
      await result.current.loadMore();
    });

    expect(result.current.books).toStrictEqual([book, book]);
  });

  it("should be able to pull newest books", async () => {
    mockServer.use(
      rest.get("http://loveread.ec/index_book.php", (req, res, ctx) => {
        return res(
          ctx.text(/* html */ `
          <table>
            <img align="left" class="margin-right_8"
              src="img/photo_books/1.jpg" title="genre"
              alt="genre"/>
            <p>Жанр genre</p>
            <div class="td_top_text"><strong>title</strong></div>
          </table>
          <a href='index_book.php?id_genre=1&amp;p=17307' title='title'>Вперед</a>
        `)
        );
      })
    );

    const oldBook: Book = {
      id: 1,
      title: "title",
      genre: "genre",
      coverUrl: `http://loveread.ec/img/photo_books/1.jpg`,
    };

    const newBook: Book = {
      id: 2,
      title: "title",
      genre: "genre",
      coverUrl: `http://loveread.ec/img/photo_books/2.jpg`,
    };

    const { result, waitFor } = renderHook(() => useBooks());
    mockServer.resetHandlers();

    mockServer.use(
      rest.get("http://loveread.ec/index_book.php", (req, res, ctx) => {
        return res(
          ctx.text(/* html */ `
          <table>
            <img align="left" class="margin-right_8"
              src="img/photo_books/2.jpg" title="genre"
              alt="genre"/>
            <p>Жанр genre</p>
            <div class="td_top_text"><strong>title</strong></div>
          </table>
          <a href='index_book.php?id_genre=1&amp;p=17307' title='title'>Вперед</a>
        `)
        );
      })
    );

    await waitFor(() => result.current.books.length > 0);

    expect(result.current.books).toStrictEqual([oldBook]);

    await act(async () => {
      await result.current.refresh();
    });

    expect(result.current.books).toStrictEqual([newBook]);
  });
});
