import { combineReducers } from '@reduxjs/toolkit';
import weather from './weather/weather.slice';

export const reducers = combineReducers({
  weather,
});
