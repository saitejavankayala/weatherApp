import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import SettingsScreen from '../screens/SettingsScreen';
import { toggleUnit } from '../features/settings/settingsSlice';

const mockStore = configureStore([]);

jest.mock('../features/settings/settingsSlice', () => ({
  toggleUnit: jest.fn(() => ({ type: 'settings/toggleUnit' })),
}));

describe('SettingsScreen', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      settings: {
        unit: 'metric',
      },
    });

    store.dispatch = jest.fn();
  });

  it('renders with default unit as Celsius', () => {
    const { getByText } = render(
      <Provider store={store}>
        <SettingsScreen />
      </Provider>
    );

    expect(getByText(/Temperature Unit: Celsius/i)).toBeTruthy();
  });

  it('dispatches toggleUnit action on switch toggle', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <SettingsScreen />
      </Provider>
    );

    const switchToggle = getByRole('switch');
    fireEvent(switchToggle, 'valueChange');

    expect(store.dispatch).toHaveBeenCalledWith(toggleUnit());
  });

  it('shows Fahrenheit when unit is imperial', () => {
    store = mockStore({
      settings: {
        unit: 'imperial',
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <SettingsScreen />
      </Provider>
    );

    expect(getByText(/Temperature Unit: Fahrenheit/i)).toBeTruthy();
  });
});
