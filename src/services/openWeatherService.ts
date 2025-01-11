import axios from "axios";

export const getWeatherData = async (city: string) => {
  try {
    const baseUrl = process.env.REACT_APP_OPEN_WEATHER_API_BASE_URL as string;
    const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY as string;

    if (!baseUrl || !apiKey) {
      throw new Error("API base URL or API key is missing");
    }

    const response = await axios.get(baseUrl, {
      params: {
        q: city,
        appid: apiKey,
        units: "metric",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
