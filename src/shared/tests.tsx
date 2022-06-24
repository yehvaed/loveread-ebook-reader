import { renderHook } from "@testing-library/react-hooks";
import { render } from "@testing-library/react-native";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const AllTheProviders = ({ children }: React.PropsWithChildren<object>) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const customRender: typeof render = (ui, options?) =>
  render(ui, { wrapper: AllTheProviders, ...options });

const customRenderHook: typeof renderHook = (callback, options = {}) =>
  renderHook(callback, {
    wrapper: AllTheProviders,
    ...options,
  });

// re-export everything
export * from "@testing-library/react-native";

// re-export hooks utils
export { act } from "@testing-library/react-hooks";

// override render method
export { customRender as render };
export { customRenderHook as renderHook };
