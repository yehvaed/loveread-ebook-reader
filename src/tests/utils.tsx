import { render } from '@testing-library/react-native';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()

const AllTheProviders = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

const customRender = (ui: any, options?: any) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react-native'

// override render method
export { customRender as render }