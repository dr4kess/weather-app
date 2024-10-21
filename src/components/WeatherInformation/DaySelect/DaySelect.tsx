// src/components/DaySelect/DaySelect.tsx
import { useSelector } from 'react-redux';
import {
  customFloor,
  extractMonthDay,
  getUniqueDaysWithWeatherData,
  getWeatherIconUrl,
} from '../../../helpers/weather.helper';
import {
  selectCurrentUnit,
  selectDailyForecast,
  selectWeatherLoading,
  selectError,
  setCurrentWeatherData,
} from '../../../store/reducers/weather/weather.slice';
import { useAppDispatch } from '../../../store/hooks/redux.hooks';
import Spinner from '../../Spinner/Spinner';

import './DaySelect.scss';
import { UNITS } from '../../../constants/app.constants';

const DaySelect = () => {
  const dispatch = useAppDispatch();
  const dailyForecast = useSelector(selectDailyForecast);
  const currentUnit = useSelector(selectCurrentUnit);
  const loading = useSelector(selectWeatherLoading);
  const weatherError = useSelector(selectError);

  const {CELCIUS, FAHREN} = UNITS

  const uniqueDailyWeatherList = getUniqueDaysWithWeatherData(dailyForecast);

  if (loading) {
    return <div className="day-select-wrapper"><Spinner /></div>;
  }

  if (weatherError) {
    return <div className="error-message">{weatherError}</div>;
  }

  if (uniqueDailyWeatherList.length === 0) {
    return <p>No forecast data available.</p>;
  }

  return (
    <div className="day-select-wrapper">
      {uniqueDailyWeatherList.map((day, index) => {
        const temperature = customFloor(day.main.temp, currentUnit);
        const monthDay = extractMonthDay(day.dt_txt);
        const icon = getWeatherIconUrl(day.weather[0].icon);

        return (
          <button
            key={index}
            className="day-select-button"
            onClick={() => dispatch(setCurrentWeatherData(day))}
          >
            <div className="day-label">{monthDay}</div>
            <div className="day-weather-info">
              <span className="day-temp">
                {temperature} {currentUnit === CELCIUS ? '°C' : '°F'}
              </span>
              <img src={icon} alt={day.weather[0].description} className="day-icon" />
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default DaySelect;
