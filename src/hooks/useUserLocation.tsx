import { useEffect, useState } from 'react';
import axios from 'axios';

const useUserLocation = () => {
  const [city, setCity] = useState<string>(''); 

  const getGeoInfo = async () => {
    try {
      const response = await axios.get('https://ipapi.co/json/');
      const data = response.data;
      setCity(data.city); 
    } catch (error) {
      console.error('Ошибка при получении местоположения:', error);
      setCity('Yerevan'); 
    }
  };

  useEffect(() => {
    getGeoInfo();
  }, []);

  return city;
};

export default useUserLocation;
