export type TUnit = 'metric' | 'imperial'; 


export interface WeatherState {
  currentWeather: any | null;
  dailyForecast: any[];
  unit: TUnit
  loading: boolean;
  error: string | null;
}