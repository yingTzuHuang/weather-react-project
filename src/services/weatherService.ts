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

export const getWeatherData = async (city: City): Promise<WeatherDto> => {
  try {
    if (!import.meta.env) {
      throw new Error("Environment variables are not accessible");
    }

    const baseUrl = import.meta.env.VITE_OPEN_WEATHER_API_BASE_URL as string;
    const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY as string;

    const params =
      city.lat && city.long
        ? {
            lat: city.lat,
            lon: city.long,
            appid: apiKey,
          }
        : { q: city.name, appid: apiKey };

    const response = await axios.get(baseUrl, {
      params,
    });

    return response.data as WeatherDto;
  } catch (error) {
    throw error;
  }
};
