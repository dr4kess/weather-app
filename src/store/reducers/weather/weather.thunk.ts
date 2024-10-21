import axiosInstance from '../../../axios/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';


export const fetchCurrentWeather = createAsyncThunk(
    'weather/fetchCurrentWeather',
    async (city: string, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get('weather', {
          params: { q: city },
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error?.message);
      }
    }
  );
  
  // Получение прогноза на несколько дней
  export const fetchDailyWeather = createAsyncThunk(
    'weather/fetchDailyWeather',
    async (city: string, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get('forecast', {
          params: { q: city },
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );