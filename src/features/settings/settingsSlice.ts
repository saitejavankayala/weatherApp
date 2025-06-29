import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    unit: 'metric',
  },
  reducers: {
    toggleUnit(state) {
      state.unit = state.unit === 'metric' ? 'imperial' : 'metric';
    },
  },
});

export const { toggleUnit } = settingsSlice.actions;
export default settingsSlice.reducer;