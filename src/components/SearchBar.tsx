import { FC } from "react";
import {
  Stack,
  IconButton,
  Autocomplete,
  TextField,
  createFilterOptions,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SearchOption } from "../models/SearchOption";
import "./SearchBar.css";

interface SearchBarProps {
  cityOptions: SearchOption[];
  onChangeSearchInput: (input: string) => void;
  onSearch: () => void;
  value: string;
}

const filterOptions = createFilterOptions<SearchOption>({
  matchFrom: "start",
  stringify: (option) => option.id,
  limit: 100,
});

const SearchBar: FC<SearchBarProps> = ({
  cityOptions,
  onChangeSearchInput,
  value,
  onSearch,
}) => {
  return (
    <Stack className="search-container" direction="row" spacing={2}>
      <Autocomplete
        className="search-input"
        disableClearable
        filterOptions={filterOptions}
        getOptionLabel={(option: SearchOption | string) =>
          typeof option === "string" ? option : (option as SearchOption).id
        }
        options={cityOptions}
        value={value}
        onInputChange={(_, newValue) => {
          onChangeSearchInput(newValue || "");
        }}
        renderInput={(params) => (
          <TextField
            className="no-border-input"
            sx={{ width: 300 }}
            {...params}
            label="City/Country"
            type="search"
            fullWidth
          />
        )}
        freeSolo
      />
      <IconButton
        disableRipple
        className="search-icon-button"
        onClick={(e) => {
          onSearch();
        }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Stack>
  );
};

export default SearchBar;
