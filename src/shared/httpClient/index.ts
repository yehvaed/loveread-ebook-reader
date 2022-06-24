import axios from "axios";

import * as decodeMiddleware from "./middlewares/decodeMiddleware";
import * as normaliseMiddleware from "./middlewares/normaliseMiddleware";
import * as unescapeMiddleware from "./middlewares/unescapeMiddleware";

const middlewares = [decodeMiddleware, unescapeMiddleware, normaliseMiddleware];

middlewares.forEach((middleware) => {
  const { response } = axios.interceptors;
  response.use(middleware.onResponse);
}, axios);

axios.defaults.baseURL = "http://loveread.ec";
axios.defaults.timeout = 3000;

export default axios;
