import { useEffect, useState } from 'react';
import axios from 'axios';

const useUserLocation = () => {
  const [city, setCity] = useState<string>(''); // Название города

  // Асинхронная функция для получения геоинформации
  const getGeoInfo = async () => {
    try {
      const response = await axios.get('https://ipapi.co/json/');
      const data = response.data;
      setCity(data.city); // Сохраняем название города
    } catch (error) {
      console.error('Ошибка при получении местоположения:', error);
      setCity('Yerevan'); // Обработка ошибки
    }
  };

  useEffect(() => {
    getGeoInfo();
  }, []);

  return city;
};

export default useUserLocation;
