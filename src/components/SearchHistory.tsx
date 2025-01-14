import { FC } from "react";
import { SearchHistoryItem } from "../models/WeatherHistoryItem";
import { getFormattedDateTime } from "../utils/dateUtil";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";

interface SearchHistoryProps {
  items: SearchHistoryItem[];
  onSearch: (city: string) => void;
  onDelete: (id: number) => void;
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
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!items || items?.length === 0) {
    return <div>No Record Found</div>;
  }

  return (
    <div>
      <h2>Search History</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.id}
            {item.city}
            {getFormattedDateTime(item.searchDateTime)}
            <IconButton
              onClick={() => onSearch(item.city)}
              aria-label="search-again"
            >
              <SearchIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(item.id)} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;
