import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getWeatherByCity } from '../../api/weather';

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async ({ city, unit }: { city: string; unit: 'metric' | 'imperial' }) => {
    const data = await getWeatherByCity(city, unit);
    return data;
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    current: null,
    forecast: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.current;
        state.forecast = action.payload.forecast.list.filter((_: any, index: number) => index % 8 === 0);
      })
      .addCase(fetchWeather.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch weather';
      });
  },
});

export default weatherSlice.reducer;