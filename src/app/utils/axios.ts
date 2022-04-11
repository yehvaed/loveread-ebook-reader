import axios from 'axios';

import { convertWindows1252toUTF16 } from './helpers/convertWindows1252toUTF16';

export const client = axios.create({
  baseURL: "http://loveread.ec",
});

client.interceptors.response.use((res) => {
  const convertedResponse = convertWindows1252toUTF16(res.data)
    .replace(/[\n\t]*/g, "")
    .replace(/[ ]+/g, " ")
    .replace("&amp;", "&");
  res.data = convertedResponse;
  return res;
});
