export const normalizeResponse = (response: string) => {
  return response
    .replace(/[\t]+/g, " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&#8205;", "")
    .replaceAll("&#8203;", "")
    .replaceAll("&#65279;", "")
    .replaceAll("&#8204;", "")
    .replaceAll("&#xFEFF;", "")
    .replaceAll("<i>", "")
    .replaceAll("</i>", "")
    .replaceAll("<b>", "")
    .replaceAll("</b>", "")
    .replace(/(\r\n|\n|\r)/gm, " ")
    .replace(/[ ]+/g, " ");
};
