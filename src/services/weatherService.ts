import axios from "axios";
import { City } from "../models/City";

export interface WeatherDto {
  weather: [
    {
      main: string;
      description: string;
      icon: string;
    }
  ];
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  name: string;
  sys: {
    country: string;
  };
}

if (!import.meta.env) {
  throw new Error("Environment variables are not accessible");
}

const baseUrl = import.meta.env.VITE_OPEN_WEATHER_API_BASE_URL as string;
const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY as string;

const commonQueryParams = {
  appid: apiKey,
  units: "metric",
};

export const getWeatherDataByCityName = async (
  city: string
): Promise<WeatherDto> => {
  try {
    const response = await axios.get(baseUrl, {
      params: { q: city, ...commonQueryParams },
    });

    return response.data as WeatherDto;
  } catch {
    throw new Error("Failed to fetch record");
  }
};

export const getWeatherDataByCoordinates = async (
  city: City
): Promise<WeatherDto> => {
  try {
    const response = await axios.get(baseUrl, {
      params: { lat: city.lat, lon: city.long, ...commonQueryParams },
    });

    return response.data as WeatherDto;
  } catch (error) {
    throw error;
  }
};
