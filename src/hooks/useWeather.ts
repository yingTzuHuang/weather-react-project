import { useState, useEffect } from "react";
import { getWeatherData } from "../services/weatherService";
import { Weather } from "../models/Weather";
import { convertWeatherDtoToWeather } from "../utils/weatherUtil";
import { addItemToWeatherHistory } from "../services/weatherHistoryService";
import { City } from "../models/City";

const useWeather = (city: City, searchTime: Date) => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Get weather data from the API
        const data = await getWeatherData(city);
        // Convert to UI model
        const uiWeather: Weather = convertWeatherDtoToWeather(data);

        setWeather(uiWeather);

        const newWeatherHistoryItemDto = {
          city: uiWeather.city,
          countryCode: uiWeather.countryCode,
          searchDateTime: searchTime,
        };

        // Save to search history
        addItemToWeatherHistory(newWeatherHistoryItemDto);
      } catch (err) {
        setError(new Error("Failed to find record"));
      } finally {
        setLoading(false);
      }
    };

    if (city) {
      fetchWeather();
    } else {
      setWeather(null);
    }
  }, [city]);

  return { weather, loading, error };
};

export default useWeather;
