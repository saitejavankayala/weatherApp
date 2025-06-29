// __tests__/HomeScreen.test.tsx

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import HomeScreen from '../screens/HomeScreen';

const mockStore = configureStore([]);

describe('HomeScreen', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      weather: {
        current: null,
        forecast: [],
        loading: false,
        error: null,
      },
      settings: {
        unit: 'metric',
      },
    });

    store.dispatch = jest.fn();
  });

  it('renders input and button correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );

    expect(getByPlaceholderText('Enter city')).toBeTruthy();
    expect(getByText('Get Weather')).toBeTruthy();
  });

  it('dispatches fetchWeather when button is pressed', async () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );

    const input = getByPlaceholderText('Enter city');
    const button = getByText('Get Weather');

    fireEvent.changeText(input, 'London');
    fireEvent.press(button);

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
  });

  it('shows loading indicator when loading is true', () => {
    store = mockStore({
      weather: {
        current: null,
        forecast: [],
        loading: true,
        error: null,
      },
      settings: {
        unit: 'metric',
      },
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );

    expect(getByTestId('ActivityIndicator')).toBeTruthy();
  });

  it('displays error message when error exists', () => {
    store = mockStore({
      weather: {
        current: null,
        forecast: [],
        loading: false,
        error: 'City not found',
      },
      settings: {
        unit: 'metric',
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );

    expect(getByText('City not found')).toBeTruthy();
  });
});
