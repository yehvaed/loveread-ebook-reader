import { AxiosResponse } from "axios";
import _ from "lodash";

export const onResponse = (response: AxiosResponse) => {
  response.data = _.unescape(response.data);
  return response;
};
