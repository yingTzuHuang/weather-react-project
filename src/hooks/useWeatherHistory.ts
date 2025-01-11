import { useState, useEffect } from "react";
import {
  getWeatherHistoryItems,
  WeatherHistoryItemDto,
} from "../services/weatherHistoryService";
import { WeatherHistoryItem } from "../models/WeatherHistoryItem";

const useWeatherHistory = () => {
  const [historyItems, setHistoryItems] = useState<WeatherHistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherHistory = async () => {
      try {
        const history: WeatherHistoryItemDto[] = await getWeatherHistoryItems();
        const rows: WeatherHistoryItem[] = history.map((item) => ({
          city: item.city,
          countryCode: item.countryCode,
          searchDateTime: item.searchDateTime,
        }));
        setHistoryItems(rows);
      } catch (err) {
        setError("Failed to fetch weather history");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherHistory();
  }, []);

  return { historyItems, loading, error };
};

export default useWeatherHistory;
