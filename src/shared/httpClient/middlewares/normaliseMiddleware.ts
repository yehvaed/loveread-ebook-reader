import { AxiosResponse } from "axios";

export function normalise(s: string) {
  return s
    .replace(/[\t]+/g, " ")
    .replaceAll("&#8205;", "")
    .replaceAll("&#8203;", "")
    .replaceAll("&#65279;", "")
    .replaceAll("&#8204;", "")
    .replaceAll("&#xFEFF;", "")
    .replaceAll("&#039;", "'")
    .replaceAll("&#8210;", "-")
    .replaceAll("<i>", "")
    .replaceAll("</i>", "")
    .replaceAll("<b>", "")
    .replaceAll("</b>", "")
    .replace(/(\r\n|\n|\r)/gm, " ")
    .replace(/[ ]+/g, " ");
}

export const onResponse = (response: AxiosResponse) => {
  response.data = normalise(response.data);
  return response;
};
