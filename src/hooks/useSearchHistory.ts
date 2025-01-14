import { useState, useEffect, useCallback } from "react";
import {
  addItemToSearchHistory,
  deleteSearchHistoryItem,
  getWeatherHistoryItems,
  SearchHistoryItemDto,
} from "../services/searchHistoryService";
import { SearchHistoryItem } from "../models/WeatherHistoryItem";
import {
  convertSearchHistoryItemDtosToSearchHistoryItems,
  convertSearchInfoToSearchHistoryItemDto,
} from "../utils/searchHistoryUtil";

const useSearchHistory = () => {
  const [historyItems, setHistoryItems] = useState<SearchHistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSearchHistory = useCallback(async () => {
    try {
      const historyData: SearchHistoryItemDto[] =
        await getWeatherHistoryItems()?.reverse();

      const rows: SearchHistoryItem[] =
        convertSearchHistoryItemDtosToSearchHistoryItems(historyData);

      setHistoryItems(rows);
      setError(null);
    } catch (err) {
      setError("Failed to fetch weather history");
    } finally {
      setLoading(false);
    }
  }, []);

  const addToSearchHistory = useCallback(
    (city: string, searchDateTime: Date) => {
      const newSearchHistoryItemDto = convertSearchInfoToSearchHistoryItemDto(
        city,
        searchDateTime
      );

      // Save to search history
      addItemToSearchHistory(newSearchHistoryItemDto);
      // Fetch instead of setting state because storage has maximum storage item count rule. Setting state will not be accurate unless we implement same logic here.
      fetchSearchHistory();
    },
    []
  );

  const removeSearchHistoryItem = useCallback((id: number) => {
    deleteSearchHistoryItem(id);
    fetchSearchHistory();
  }, []);

  useEffect(() => {
    fetchSearchHistory();
  }, []);

  return {
    historyItems,
    loading,
    error,
    addToHistory: addToSearchHistory,
    deleteSearchHistoryItem: removeSearchHistoryItem,
  };
};

export default useSearchHistory;
