import axios from 'axios';

const API_KEY = "cc49742e75ace4204910943eb8be6518"
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: "metric"
  },
});

export default axiosInstance;