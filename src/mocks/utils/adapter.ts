import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

// TODO: make simillar to msw
type RouteMatcher = (req: any, res: any, ctx: any) => any

export const rest = {
    get(url: string, matcher: RouteMatcher) {
        return (axios: AxiosMockAdapter) => {
            axios.onGet(url).reply(config => {
                const modificators = {
                    text(response: string) {
                        return {
                            response
                        }
                    }
                }

                const responseFactory = (...contextModificators) => {
                    return contextModificators.reduce((result, modificator) => ({
                        ...result,
                        ...modificator,
                    }), { statusCode: 200})
                };

                const mock = matcher({}, responseFactory, modificators);


                return [
                    mock.statusCode,
                    mock.response
                ]
            });
        }
    }
};

export const setupServer = (...handlers: any[]) => {
    const axiosMockAdapter = new AxiosMockAdapter(axios);

    return {
        listen() {
            handlers.forEach(handler => handler(axiosMockAdapter))
        }
    }
}