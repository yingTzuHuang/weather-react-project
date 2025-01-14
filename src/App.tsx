import { useState, useEffect, useCallback, useRef } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";

import { City } from "country-state-city";
import { debounce } from "lodash";
import useWeather from "./hooks/useWeather";
import TodaysWeather from "./components/TodaysWeather";
import { getSearchOptionFromICity } from "./utils/searchUtil";
import useSearchHistory from "./hooks/useSearchHistory";
import SearchHistory from "./components/SearchHistory";

const defaultTargetCity = "";

const cities = City.getAllCities()
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((city) => getSearchOptionFromICity(city));

function App() {
  const isFirstLoad = useRef(true);
  const [inputValue, setInputValue] = useState<string>(defaultTargetCity);

  const latestInputValue = useRef<string>("");

  // TODO: Refine autocomplete onChange & onChangeInput
  const onChangeSearchInput = useCallback(
    debounce((input: string) => {
      setInputValue(input);
      latestInputValue.current = input;
    }, 500),
    []
  );

  const [searchTime, setSearchTime] = useState<Date>(new Date());

  const [searchValue, setSearchValue] = useState<string>(defaultTargetCity);

  const {
    error: historyError,
    historyItems,
    loading: loadingHistory,
    addToHistory,
    deleteSearchHistoryItem,
  } = useSearchHistory();

  const { error, weather, loading } = useWeather(cities, searchValue);

  const searchWeather = useCallback((city: string) => {
    const searchDateTime = new Date();
    setSearchTime(searchDateTime);
    setSearchValue(city);
  }, []);

  const onSearch = useCallback(() => {
    searchWeather(inputValue);
  }, [inputValue]);

  const onSearchAgain = useCallback((historyCity: string) => {
    searchWeather(historyCity);
  }, []);

  const onDelete = (id: number) => {
    deleteSearchHistoryItem(id);
  };

  useEffect(() => {
    // Exclude first load search from adding to history
    if (isFirstLoad.current) {
      isFirstLoad.current = false; // Set to false after first render
      return; // Exit early on first load
    }

    if (searchValue) {
      addToHistory(searchValue, searchTime);
    }
  }, [searchValue]);

  return (
    <>
      <SearchBar
        cityOptions={cities}
        onChangeSearchInput={onChangeSearchInput}
        onSearch={onSearch}
        value={inputValue}
      />
      <TodaysWeather
        error={error}
        loading={loading}
        weather={weather}
        searchTime={searchTime}
      />
      <SearchHistory
        items={historyItems}
        onSearch={onSearchAgain}
        onDelete={onDelete}
        error={historyError}
        loading={loadingHistory}
      />
    </>
  );
}

export default App;
