import { useSelector } from 'react-redux';
import { selectCurrentUnit, selectCurrentWeather, selectDailyForecast } from '../../../store/reducers/weather/weather.slice';
import { customFloor, getHourlyWeatherForCurrentDate, getWeatherIconUrl } from '../../../helpers/weather.helper';

import './HourlyInformation.scss';
import { UNITS } from '../../../constants/app.constants';

const HourlyInformation = () => {
  const dailyForecast = useSelector(selectDailyForecast);
  const currentWeather = useSelector(selectCurrentWeather)
  const currentUnit = useSelector(selectCurrentUnit)
  const dt = currentWeather?.dt;

  const {CELCIUS, FAHREN} = UNITS
  const hourlyWeatherForToday = getHourlyWeatherForCurrentDate(dt, dailyForecast).slice(0, 6);

  const  temperature = customFloor(currentWeather?.main.temp, currentUnit);

  return (
    <div className="hourly-information-wrapper">
      {hourlyWeatherForToday.map((item, index) => (
        <div key={index} className="hourly-row">
          <span className="hourly-time">{item.dt_txt.split(' ')[1]}</span>
          <span className="hourly-temp">
            {temperature} {currentUnit === CELCIUS ? '°C' : '°F'}
          </span>
          <img
            className="hourly-icon"
            src={getWeatherIconUrl(item.weather[0].icon)}
            alt={item.weather[0].description}
          />
        </div>
      ))}
    </div>
  );
};

export default HourlyInformation;
