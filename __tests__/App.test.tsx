// __tests__/App.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

describe('App', () => {
  it('renders the app without crashing', () => {
    const tree = render(<App />);
    expect(tree).toBeTruthy();
  });
});
