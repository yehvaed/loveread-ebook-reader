export const normalizeResponse = (response: string) => {
  return response
    .replace(/[\t]+/g, " ")
    .replaceAll("&amp;", "&")
    .replaceAll("<i>", "")
    .replaceAll("</i>", "")
    .replaceAll("<b>", "")
    .replaceAll("</b>", "")
    .replace(/(\r\n|\n|\r)/gm, " ")
    .replace(/[ ]+/g, " ");
};
