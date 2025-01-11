import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";

import { City } from "country-state-city";
import { debounce } from "lodash";
import useWeather from "./hooks/useWeather";
import TodaysWeather from "./components/TodaysWeather";
import {
  generateOptionIdFromInputString,
  getSearchOptionFromICity,
  getSearchOptionFromInputString,
} from "./utils/searchUtil";
import { SearchOption } from "./models/SearchOption";
import useWeatherHistory from "./hooks/useWeatherHistory";
import SearchHistory from "./components/SearchHistory";

const defaultTargetCity = "Singapore";
const defaultTargetCityOption =
  getSearchOptionFromInputString(defaultTargetCity);

const cities = City.getAllCities().map((city) =>
  getSearchOptionFromICity(city)
);

function App() {
  const [inputValue, setInputValue] = useState<string>(defaultTargetCity);

  const latestInputValue = useRef<string>("");

  const onChangeSearchInput = debounce((input: string) => {
    setInputValue(input);
    latestInputValue.current = input;
  }, 300);

  // Set city options based on searchValue so that
  const onKeyDown = useCallback(
    debounce(() => {
      const relatedOptions = latestInputValue?.current
        ? cities.filter((c) =>
            c.id
              .toLocaleLowerCase()
              .startsWith(latestInputValue.current.toLocaleLowerCase())
          )
        : [];
      setCityOptions(relatedOptions);
    }, 300),
    [latestInputValue.current]
  );

  const [searchTime, setSearchTime] = useState<Date>(new Date());

  const [searchValue, setSearchValue] = useState<SearchOption>(
    defaultTargetCityOption
  );

  const [cityOptions, setCityOptions] = useState<SearchOption[]>([]);

  const onSearch = useCallback(() => {
    setSearchTime(new Date());
    const searchOption =
      cities.find(
        (c) => c.id === generateOptionIdFromInputString(inputValue)
      ) || getSearchOptionFromInputString(inputValue);
    setSearchValue(searchOption);
  }, [inputValue]);

  const onSearchAgain = useCallback(
    (historyCity: string) => {
      setSearchTime(new Date());
      const searchOption =
        cities.find(
          (c) => c.id === generateOptionIdFromInputString(historyCity)
        ) || getSearchOptionFromInputString(historyCity);
      setSearchValue(searchOption);
    },
    [inputValue]
  );

  const { error, weather, loading } = useWeather(searchValue.value, searchTime);
  const {
    error: historyError,
    historyItems,
    loading: loadingHistory,
  } = useWeatherHistory();

  const onDelete = (city: string) => {};

  return (
    <>
      <SearchBar
        cityOptions={cityOptions}
        onChangeSearchInput={onChangeSearchInput}
        onKeyDown={onKeyDown}
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
