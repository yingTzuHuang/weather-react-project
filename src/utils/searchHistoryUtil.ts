import { SearchHistoryItem } from "../models/WeatherHistoryItem";
import { SearchHistoryItemDto } from "../services/searchHistoryService";

export const convertSearchHistoryItemDtosToSearchHistoryItems = (
  historyItemDtos: SearchHistoryItemDto[]
): SearchHistoryItem[] =>
  historyItemDtos.map((dto) => ({
    id: new Date(dto.searchDateTime).getTime(),
    city: dto.city,
    searchDateTime: dto.searchDateTime,
  }));

export const convertSearchInfoToSearchHistoryItemDto = (
  city: string,
  searchDateTime: Date
): SearchHistoryItemDto => {
  return {
    id: searchDateTime.getTime(),
    city,
    searchDateTime,
  };
};
