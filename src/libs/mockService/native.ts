import { AxiosInstance } from 'axios';

import { MockHandlerDefinition } from './types';

export const createSetupWorker =
  (...instances: AxiosInstance[]) =>
  (...handlers: MockHandlerDefinition[]) => {
    const mockInterceptors = [];
    return {
      start() {
        for (const instance of instances) {
          const requestInterceptor = instance.interceptors.request.use(
            async (config) => {
              // find coresponding handler
              const [targetHandler] = handlers.filter(
                ({ url, method }) =>
                  method === config.method && !(config?.url?.match(new RegExp(`${url}`)) == null),
              );

              if (!targetHandler) return config;

              // if exist execute it and take a data
              const response = await targetHandler.callback(config);
              if (!response) return config;

              // if we have response throw it so error interceptor take action
              throw {
                mocked: true,
                ...response,
              };
            },
            async (errorOrMockedData) => {
              // check if error is a mocked data and resolve
              return errorOrMockedData.mocked
                ? await Promise.resolve(errorOrMockedData)
                : await Promise.reject(errorOrMockedData);
            },
          );

          const responseInterceptor = instance.interceptors.response.use(
            (response) => response,
            async (errorOrMockedData) => {
              // check if error is a mocked data and resolve
              return errorOrMockedData.mocked
                ? await Promise.resolve(errorOrMockedData)
                : await Promise.reject(errorOrMockedData);
            },
          );

          mockInterceptors.push(requestInterceptor, responseInterceptor);
        }
      },
    };
  };
