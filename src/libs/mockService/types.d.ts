import type { AxiosRequestConfig } from 'axios';

// TODO: make simillar to msw
type RouteMatcher = (req: any, res: any, ctx: any) => any;

type HttpMethod = 'get';

interface MockHandlerDefinition {
  method: HttpMethod;
  url: string;
  callback: (config: AxiosRequestConfig) => Promise<any>;
}
