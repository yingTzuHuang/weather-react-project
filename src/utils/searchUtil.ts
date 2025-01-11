import { ICity } from "country-state-city";
import { City } from "../models/City";
import { SearchOption } from "../models/SearchOption";

export const generateOptionIdFromICity = (city: ICity): string =>
  `${city.name},${city.stateCode ? `${city.stateCode},` : ""}${
    city.countryCode
  }`;

export const generateOptionIdFromInputString = (inputString: string): string =>
  inputString;

export const getSearchOptionFromICity = (city: ICity): SearchOption => ({
  id: generateOptionIdFromICity(city),
  value: {
    name: city.name,
    countryCode: city.countryCode,
    stat: city.stateCode,
    lat: city.latitude,
    long: city.longitude,
  } as City,
});

export const getSearchOptionFromInputString = (
  inputString: string
): SearchOption => ({
  id: generateOptionIdFromInputString(inputString),
  value: {
    name: inputString,
  } as City,
});

// export const generateOptionFromCity = (city: City): string =>
//   city
//     ? `${city.name},${city.state ? `${city.state},` : ""}${city.countryCode}`
//     : "";

// export const getCityFromOption = (city: string): string =>
//   city ? city.split(",")[0] : "";
export const getCityFromSearchOption = (searchOption: SearchOption): City =>
  searchOption.value;
