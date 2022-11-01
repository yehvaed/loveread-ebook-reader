import { AxiosRequestConfig, AxiosResponse } from 'axios';

import { MockHandlerDefinition } from './types';

const mockServiceContext = {
  delay(timeMs: number) {
    return async (res: AxiosResponse) => {
      return await new Promise((resolve) => setTimeout(() => resolve(res), timeMs));
    };
  },
  status(statusCode: number, statusText: string = '') {
    return (res: AxiosResponse) => {
      res.status = statusCode;
      res.statusText = statusText;
      return res;
    };
  },
  json(data: any) {
    return (res: AxiosResponse) => {
      res.data = data;
      return res;
    };
  },
  text(data: any) {
    return (res: AxiosResponse) => {
      res.data = data;
      return res;
    };
  },
  headers(responseHeaders: Record<string, any>) {
    return (res: AxiosResponse) => {
      res.headers = responseHeaders;
      return res;
    };
  },
};

export const context = mockServiceContext;

const internalModificators = {
  log() {
    return (res: AxiosResponse) => {
      const {
        config: { method, url },
      } = res;

      if (method && url) {
        console.debug(`[MockService] ${method.toUpperCase()} - ${url}`);
      }

      return res;
    };
  },
};

const createInitialResponse = (config: AxiosRequestConfig): AxiosResponse => {
  return {
    config,
    status: 200,
    headers: config?.headers?.common as any,
    data: undefined,
    statusText: '',
  };
};

const parseQueryParams = (url: string | undefined) => {
  if (!url) return {};

  const [, query] = url?.split('?');
  if (!query) return {};

  return query.split('&').reduce<Record<string, any>>((params, paramWithValue) => {
    const [key, value] = paramWithValue.split('=');
    return {
      ...params,
      [key]: value,
    };
  }, {});
};

type MockServiceContext = typeof mockServiceContext;
type ResponseModificator = ReturnType<MockServiceContext['status']>;

type ResponseModificatorComposer = (
  ...modificators: ResponseModificator[]
) => Promise<AxiosResponse>;

type RouteMatcher = (
  req: AxiosRequestConfig,
  res: ResponseModificatorComposer,
  ctx: MockServiceContext,
) => Promise<AxiosResponse>;

export const get = (url: string, matcher: RouteMatcher): MockHandlerDefinition => {
  return {
    callback: async (config: AxiosRequestConfig) => {
      return await matcher(
        {
          ...config,
          params: parseQueryParams(config.url),
        },
        async (...modificators: ResponseModificator[]) => {
          let response = createInitialResponse(config);

          const combinedModificators = [internalModificators.log(), ...modificators];
          for (const modificator of combinedModificators) {
            response = await modificator(response);
          }

          return response;
        },
        mockServiceContext,
      );
    },
    method: 'get',
    url,
  };
};
