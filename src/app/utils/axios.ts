import axios from "axios";

import { convertWindows1252toUTF16 } from "../common/helpers/convertWindows1252toUTF16";
import { normalizeResponse } from "../common/helpers/normalizeResponse";

export const client = axios.create({
  baseURL: "http://loveread.ec",
});

client.interceptors.response.use((res) => {
  res.data = normalizeResponse(convertWindows1252toUTF16(res.data));
  return res;
});
