import { UNITS } from "../constants/app.constants";

export const getHourlyWeatherForCurrentDate = (
    currentDt: number | undefined,
    dailyForecast: any[],
  ): any[] => {
    if (!currentDt) {
      return [];
    }
    const currentDate = new Date(currentDt * 1000);

  
    return dailyForecast.filter((hourly) => {
      const hourlyDate = new Date(hourly.dt * 1000);
  
      return (
        hourlyDate.getUTCFullYear() === currentDate.getUTCFullYear() &&
        hourlyDate.getUTCMonth() === currentDate.getUTCMonth() &&
        hourlyDate.getUTCDate() === currentDate.getUTCDate()
      );
    });
  };



const { FAHREN } = UNITS;

export const customFloor = (num: number, unit: string): number => {
  let result = num;
  if (unit === FAHREN) {
    result = (num * 9) / 5 + 32;
  }
  const decimalPart = result % 1;

  if (decimalPart > 0.5) {
    return Math.ceil(result);
  } else {
    return Math.floor(result);
  }
};

export const getWeatherIconUrl = (iconName: string): string => {
  return `https://openweathermap.org/img/wn/${iconName}@2x.png`;
};

export const getUniqueDaysWithWeatherData = (dailyWeatherList: any[]): any[] => {
  const uniqueDays = new Set<string>();

  return dailyWeatherList.filter((dailyWeather) => {
    const date = new Date(dailyWeather.dt * 1000).toISOString().split('T')[0];

    if (!uniqueDays.has(date)) {
      uniqueDays.add(date);
      return true;
    }

    return false;
  });
};

export const extractMonthDay = (dateTimeString: string): string => {
  const datePart = dateTimeString.split(' ')[0];
  const [, month, day] = datePart.split('-');
  return `${month}-${day}`;
};
