import { FC } from "react";
import { Stack, IconButton, Autocomplete, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SearchOption } from "../models/SearchOption";

interface SearchBarProps {
  cityOptions: SearchOption[];
  //   onChangeSearch: () => void;
  onChangeSearchInput: (input: string) => void;
  onKeyDown: () => void;
  onSearch: () => void;
  value: string;
}

const SearchBar: FC<SearchBarProps> = ({
  cityOptions,
  //   onChangeSearch,
  onChangeSearchInput,
  value,
  onSearch,
  onKeyDown,
}) => {
  return (
    <Stack direction="row" spacing={1}>
      <Autocomplete
        getOptionLabel={(option: SearchOption | string) =>
          typeof option === "string" ? option : (option as SearchOption).id
        }
        options={cityOptions}
        value={value}
        // onChange={() => onChangeSearch()}
        onInputChange={(_, newValue) => {
          onChangeSearchInput(newValue || "");
        }}
        renderInput={(params) => (
          <TextField
            sx={{ width: 300 }}
            className="search-text-field"
            {...params}
            label="Select a city"
            onKeyDown={() => onKeyDown()}
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
