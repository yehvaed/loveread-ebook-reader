import { LOVEREAD_URL } from "@consts";
import axios, { AxiosResponse } from "axios";
import _ from "lodash";

import { convertWindows1252toUTF16 } from "./helpers/convertWindows1252toUTF16";
import { reduceNoises } from "./helpers/reduceNoises";

// const middlewares = [decodeMiddleware, unescapeMiddleware, normaliseMiddleware];

const axiosInstance = axios.create({
  adapter: axios.defaults.adapter,
  baseURL: LOVEREAD_URL,
  timeout: 3000,
});

interface Interceptors {
  onResponse(response: AxiosResponse): AxiosResponse;
}

const interceptors: Interceptors[] = [
  {
    onResponse(response) {
      response.data = convertWindows1252toUTF16(response.data);
      return response;
    },
  },
  {
    onResponse(response) {
      response.data = _.unescape(response.data);
      return response;
    },
  },
  {
    onResponse(response) {
      response.data = reduceNoises(response.data);
      return response;
    },
  },
];

for (const interceptor of interceptors) {
  axiosInstance.interceptors.response.use(interceptor.onResponse);
}

export const httpClient = axiosInstance;
