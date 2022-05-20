import { renderHook } from "@testing-library/react-hooks";
import { render } from "@testing-library/react-native";
import { queryClient } from "@utils/query";
import React from "react";
import { QueryClientProvider } from "react-query";

const AllTheProviders = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const customRender = (ui: any, options?: any) =>
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
