import { useState, useEffect } from "react";
import {
  getWeatherDataByCityName,
  getWeatherDataByCoordinates,
} from "../services/weatherService";
import { Weather } from "../models/Weather";
import { convertWeatherDtoToWeather } from "../utils/weatherUtil";
import { SearchOption } from "../models/SearchOption";
import {
  generateOptionIdFromInputString,
  getSearchOptionFromInputString,
} from "../utils/searchUtil";

const useWeather = (allCities: SearchOption[], searchTerm: string) => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchWeather = async (searchInput: string) => {
    try {
      if (!searchInput) {
        setWeather(null);
        throw new Error("Please select a city");
      }

      // Get weather data with city name (text from search bar)
      let data = await getWeatherDataByCityName(searchInput);

      // If unable to get by city name, try to get coordinates from the cities list and get weather data by coordinates
      if (!data) {
        const city =
          allCities.find(
            (c) => c.id === generateOptionIdFromInputString(searchInput)
          ) || getSearchOptionFromInputString(searchInput);

        data = await getWeatherDataByCoordinates(city.value);
      }

      // Convert to UI model
      const uiWeather: Weather = convertWeatherDtoToWeather(data);
      setWeather(uiWeather);
      setError(null);
    } catch (err) {
      setError((err as Error) || "Failed to get record");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(searchTerm);
  }, [searchTerm]);

  return { weather, loading, error };
};

export default useWeather;
