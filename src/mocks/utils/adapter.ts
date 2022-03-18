import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

// TODO: make simillar to msw
type RouteMatcher = (req: any, res: any, ctx: any) => any

const responseModificators = {
    text(response: string) {
        return {
            data: response
        }
    }
}

const responseContructor = (...modificators: any[]) => {
    const response =  modificators.reduce((result, modificator) => ({
        ...result,
        ...modificator,
    }), { statusCode: 200});

    return [response.statusCode, response.data]
};

export const rest = {
    get(url: string, matcher: RouteMatcher) {
        return (axios: AxiosMockAdapter) => {
            axios.onGet(url).reply(config => {
                return matcher({}, responseContructor, responseModificators);
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