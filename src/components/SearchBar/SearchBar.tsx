import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentWeather, fetchDailyWeather } from '../../store/reducers/weather/weather.thunk';
import { setUnit } from '../../store/reducers/weather/weather.slice';
import { RootState, AppDispatch} from '../../store/store.types'

import { useNavigate } from 'react-router-dom';
import { UNITS } from '../../constants/app.constants';

import './SearchBar.scss'

const SearchBar = () => {
  const dispatch: AppDispatch = useDispatch();
  const [city, setCity] = useState('');
  const unit = useSelector((state: RootState) => state.weather.unit);
  const navigate = useNavigate()

  const {CELCIUS, FAHREN} = UNITS

  const handleSearch = () => {
    if (city.trim()) {
      dispatch(fetchCurrentWeather(city));
      dispatch(fetchDailyWeather(city));
      navigate(city)
      
    } else {
      alert('Write country name!');
    }
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedUnit = e.target.value as 'metric' | 'imperial';
    dispatch(setUnit(selectedUnit)); 
    // dispatch(fetchCurrentWeather(city))
    // dispatch(fetchDailyWeather(city));
  };


  return (
    <div className="search-bar-wrapper">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Country name!"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="metric-select-wrapper">
        <label>
          <input
            type="radio"
            value={CELCIUS}
            checked={unit === CELCIUS}
            onChange={handleUnitChange}
          />
          °C
        </label>
        <label>
          <input
            type="radio"
            value={FAHREN}
            checked={unit === FAHREN}
            onChange={handleUnitChange}
          />
          °F
        </label>
      </div>
    </div>
  );
};

export default SearchBar;
