import { render } from '@testing-library/react-native';
import React from 'react';

import App from './App';

describe('<App />', () => {
  it('has 1 child', () => {
    const { queryByTestId } = render(<App />)
    console.log(queryByTestId("bookcard"))
    expect(queryByTestId("bookcard")).toBeDefined();
  });
});
