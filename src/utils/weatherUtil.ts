import { WeatherDto } from "../services/weatherService";
import { Weather } from "../models/Weather";

// Function to convert WeatherDto to Weather
function convertWeatherDtoToWeather(weatherDto: WeatherDto): Weather {
  return {
    city: weatherDto.name,
    countryCode: weatherDto.sys?.country,
    description: weatherDto.weather?.[0]?.description,
    humidity: weatherDto.main?.humidity,
    icon: weatherDto.weather?.[0]?.icon,
    temperature: weatherDto.main?.temp,
    temperatureHigh: weatherDto.main?.temp_max,
    temperatureLow: weatherDto.main?.temp_min,
    weather: weatherDto.weather?.[0]?.main,
  };
}

export { convertWeatherDtoToWeather };
