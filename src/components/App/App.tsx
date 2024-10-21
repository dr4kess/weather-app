import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import useUserLocation from '../../hooks/useUserLocation';
import { useAppDispatch } from '../../store/hooks/redux.hooks';
import { fetchCurrentWeather, fetchDailyWeather } from '../../store/reducers/weather/weather.thunk';
import Layout from '../Layout/Layout';

const WeatherInformation = lazy(() => import('../WeatherInformation/WeatherInformation'));

const App = () => {
  const dispatch = useAppDispatch();
  const city = useUserLocation();

  useEffect(() => {
    if (city) {
      dispatch(fetchCurrentWeather(city));
      dispatch(fetchDailyWeather(city));
    }
  }, [city, dispatch]);

  return (
    <Router>
      <Layout> 
          <Routes>
            <Route path="/" element={<Navigate to={`/${city}`} replace />} />
            <Route path="/:city" element={<WeatherInformation />} />
          </Routes>
      </Layout>
    </Router>
  );
};

export default App;
