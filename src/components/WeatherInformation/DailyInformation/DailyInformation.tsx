import { useSelector } from 'react-redux';
import {
  selectCurrentWeather,
  selectCurrentCountry,
  selectWeatherLoading,
  selectCurrentUnit,
  selectError,
} from '../../../store/reducers/weather/weather.slice';
import { getWeatherIconUrl } from '../../../helpers/weather.helper';
import { customFloor } from '../../../helpers/weather.helper'; 
import { UNITS } from '../../../constants/app.constants'; 

import './DailyInformation.scss';
import Spinner from '../../Spinner/Spinner';

const DailyInformation = () => {
  const loading = useSelector(selectWeatherLoading);
  const currentWeather = useSelector(selectCurrentWeather);
  const currentUnit = useSelector(selectCurrentUnit);
  const currentCountry = useSelector(selectCurrentCountry);
  const weatherError = useSelector(selectError);

  const { CELCIUS, FAHREN } = UNITS;

  if (loading) {
    return <div className="daily-information-wrapper"><Spinner/></div>;
  }

  if (weatherError) {
    return <div className="daily-information-wrapper">{weatherError}</div>;
  }

  if (!currentWeather) {
    return <p>There is no selected country!</p>;
  }

  const icon = getWeatherIconUrl(currentWeather.weather[0].icon);

  const temperature = customFloor(currentWeather.main.temp, currentUnit);

  return (
    <div className="daily-information-wrapper">
      <img
        className="main-weather-icon-wrapper"
        src={icon}
        alt="Weather icon"
      />
      <h2>{currentCountry}</h2>
      <p>
        Temperature: {temperature} {currentUnit === CELCIUS ? '°C' : '°F'}
      </p>
    </div>
  );
};

export default DailyInformation;
