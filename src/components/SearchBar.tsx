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
  //   onChangeSearch: () => void;
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
  //   onChangeSearch,
  onChangeSearchInput,
  value,
  onSearch,
}) => {
  return (
    <Stack direction="row" spacing={1}>
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
            sx={{ width: 300 }}
            {...params}
            label="City/Country"
            type="search"
          />
        )}
        freeSolo
      />
      <IconButton
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
