import { normalizeResponse } from "./normalizeResponse";

describe("normalizeResponse", () => {
  it("should remove not needed characters", () => {
    const cases = [
      ["&amp;&amp;", "&&"],
      ["&#8205;&#8205;", ""],
      ["&#8203;&#8203;", ""],
      ["&#65279;&#65279;", ""],
      ["&#8204;&#8204;", ""],
      ["&#xFEFF;&#xFEFF;", ""],
      ["<i></i>", ""],
      ["<b></b>", ""],
      ["&#xFEFF;&#xFEFF;", ""],
    ];

    cases.forEach(([text, expected]) =>
      expect(normalizeResponse(text)).toEqual(expected)
    );
  });

  it("should change new lines into spaces", () => {
    const cases = [
      ["\r\n", " "],
      ["\n", " "],
      ["\r", " "],
    ];

    cases.forEach(([text, expected]) =>
      expect(normalizeResponse(text)).toEqual(expected)
    );
  });

  it("should convert multiple spaces into one space", () => {
    const cases = [["        ", " "]];

    cases.forEach(([text, expected]) =>
      expect(normalizeResponse(text)).toEqual(expected)
    );
  });
});
