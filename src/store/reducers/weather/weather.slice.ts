import { createSlice } from '@reduxjs/toolkit';
import { fetchCurrentWeather, fetchDailyWeather } from './weather.thunk';
import { RootState } from '../../store.types';
import { UNITS } from '../../../constants/app.constants';

const { CELCIUS, FAHREN } = UNITS;


const initialState = {
  currentCountry: '',
  currentWeather: null,
  dailyForecast: [],
  unit: CELCIUS,
  loading: false,
  error: "",
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setUnit(state, action) {
      state.unit = action.payload;
    },
    setCurrentWeatherData(state, action) {
      state.currentWeather = action.payload;
    },
    setCurrentUnit: (state) => {
      state.unit = state.unit === CELCIUS ? FAHREN : CELCIUS;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentWeather.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWeather = action.payload;
        state.currentCountry = action.payload.name
      })
      .addCase(fetchCurrentWeather.rejected, (state) => {
        state.loading = false;
        state.error = 'City not found!';
      })
      .addCase(fetchDailyWeather.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDailyWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.dailyForecast = action.payload.list;
      })
      .addCase(fetchDailyWeather.rejected, (state) => {
        state.loading = false;
        state.error = 'City not found!';
      });
  },
});

export const { setUnit, setCurrentWeatherData } = weatherSlice.actions;
export const selectCurrentWeather = (state: RootState) => state.weather.currentWeather;
export const selectCurrentCountry = (state: RootState) => state.weather.currentCountry;
export const selectDailyForecast = (state: RootState) => state.weather.dailyForecast;
export const selectCurrentUnit = (state: RootState) => state.weather.unit;
export const selectWeatherLoading = (state: RootState) => state.weather.loading;
export const selectError = (state: RootState) => state.weather.error;

export default weatherSlice.reducer;