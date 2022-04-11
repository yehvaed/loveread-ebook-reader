import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import { client } from '../../app/utils/axios';

// TODO: make simillar to msw
type RouteMatcher = (req: any, res: any, ctx: any) => any;

const responseModificators = {
  text(response: string) {
    return {
      data: response,
    };
  },
  delay(timeout: number) {
    return {
      delay: timeout,
    };
  },
};

const responseContructor = (...modificators: any[]) => {
  const response = modificators.reduce(
    (result, modificator) => ({
      ...result,
      ...modificator,
    }),
    { statusCode: 200 }
  );

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([response.statusCode, response.data]);
    }, response.delay || 0);
  });

  return promise;
};

export const rest = {
  get(url: string, matcher: RouteMatcher) {
    return (axios: AxiosMockAdapter) => {
      const pattern = new RegExp(`${url}.*`);

      axios.onGet(pattern).reply((config) => {
        const [path, query] = config.url?.split("?")!;
        const params = query.split("&").reduce((p = {}, paramWithValue) => {
          const [key, value] = paramWithValue.split("=");
          p[key] = value;
        }, {} as any);

        const context = {
          query: params,
          ...config,
        };

        return matcher(context, responseContructor, responseModificators);
      });
    };
  },
};

export const setupServer = (...handlers: any[]) => {
  const axiosMockAdapter = new AxiosMockAdapter(client);
  return {
    listen() {
      handlers.forEach((handler) => handler(axiosMockAdapter));
    },
    resetHandlers() {
      axiosMockAdapter.resetHandlers();
    },
    close() {
      axiosMockAdapter.reset();
    },
    use(...handlers: any[]) {
      handlers.forEach((handler) => {
          handler(axiosMockAdapter)
      });
    },
  };
};
