import AxiosMockAdapter from "axios-mock-adapter";

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

export const get = (url: string, matcher: RouteMatcher) => {
  return (axios: AxiosMockAdapter) => {
    const pattern = new RegExp(`${url}.*`);

    axios.onGet(pattern).reply((config) => {
      const [, query] = config.url?.split("?")!;

      const params = query.split("&").reduce((p, paramWithValue) => {
        const [key, value] = paramWithValue.split("=");
        p[key] = value;

        return p;
      }, {} as any);

      const context = {
        ...config,
        url: {
          searchParams: {
            get: (key: string) => params[key],
          },
        },
        query: params,
      };

      return matcher(context, responseContructor, responseModificators);
    });
  };
};
