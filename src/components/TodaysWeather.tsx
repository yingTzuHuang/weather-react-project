import React from "react";
import { Weather } from "../models/Weather";
import { format } from "date-fns";
import { getFormattedDateTime } from "../utils/dateUtil";

interface WeatherProps {
  error: Error | null;
  loading: boolean;
  weather: Weather | null;
  searchTime: Date;
}

// Todo: Update the style
const TodaysWeather: React.FC<WeatherProps> = ({
  error,
  loading,
  weather,
  searchTime,
}) => {
  if (error) {
    return <div>{error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!weather) {
    return <div>No Record</div>;
  }

  const formattedTime = getFormattedDateTime(searchTime);
  return (
    <div>
      <h2>Today's Weather</h2>
      <p>
        {weather.city}, {weather.countryCode}
      </p>
      <p>Weather: {weather.weather}</p>
      <p>Description: {weather.description}</p>
      <p>
        Temperature: {weather.temperature}° L: {weather.temperatureLow}°
      </p>
      <p>
        H: {weather.temperatureHigh}° L: {weather.temperatureLow}°
      </p>
      <p>Humidity: {weather.humidity}%</p>
      <p>Time: {formattedTime}</p>
    </div>
  );
};

export default TodaysWeather;
