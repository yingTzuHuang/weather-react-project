import { FC } from "react";
import { WeatherHistoryItem } from "../models/WeatherHistoryItem";
import { getFormattedDateTime } from "../utils/dateUtil";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";

interface SearchHistoryProps {
  items: WeatherHistoryItem[];
  onSearch: (city: string) => void;
  onDelete: (city: string) => void;
  error: string | null;
  loading: boolean;
}

const SearchHistory: FC<SearchHistoryProps> = ({
  items,
  onSearch,
  onDelete,
  error,
  loading,
}) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Search History</h2>
      <ul>
        {items.map((item) => (
          <li key={item.searchDateTime.getMilliseconds?.toString()}>
            {item.city}
            {getFormattedDateTime(item.searchDateTime)}
            <IconButton
              onClick={() => onSearch(item.city)}
              aria-label="search-again"
            >
              <SearchIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(item.city)} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;
