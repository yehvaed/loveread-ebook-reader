import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import { client } from '../../../app/utils/axios';

// TODO: make simillar to msw
type RouteMatcher = (req: any, res: any, ctx: any) => any;

const responseModificators = {
  text(response: string) {
    return {
      data: response.replaceAll("&amp;", "&"),
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
        const params = query.split("&").reduce((p, paramWithValue) => {
          const [key, value] = paramWithValue.split("=");
          p[key] = value;

          return p;
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
  let axiosMockAdapter: AxiosMockAdapter | undefined;

  const createAdapter = () => {
    const adapter = new AxiosMockAdapter(client);
    adapter.originalAdapter.
    axiosMockAdapter = adapter;

    return adapter
  }

  return {
    listen() {
      const adapter = createAdapter();
      handlers.forEach((handler) => handler(adapter));
    },
    resetHandlers() {
      axiosMockAdapter?.reset();
    },
    close() {
      axiosMockAdapter?.reset();
    },
    use(...handlers: any[]) {
      const adapter = createAdapter();
      handlers.forEach((handler) => {
          handler(adapter)
      });
    },
  };
};
