import CryptoJS from "crypto-js";
import Queue from "../classes/Queue";

export interface WeatherHistoryItemDto {
  city: string;
  countryCode: string;
  description?: string;
  humidity?: number;
  icon?: string;
  searchDateTime: Date;
  temperature?: number;
  temperatureHigh?: number;
  temperatureLow?: number;
  weather?: string;
}

/**
 * Adds a weather history item to the local storage.
 * The item is encrypted using AES encryption before being stored.
 * If the history exceeds the maximum size, the oldest item is removed.
 * @param {WeatherHistoryItemDto} item - The weather history item to add.
 * @returns {void}
 */
export const addItemToWeatherHistory = (item: WeatherHistoryItemDto): void => {
  try {
    const historyKey = import.meta.env.VITE_LOCAL_STORAGE_KEY as string;
    const secretKey = import.meta.env.VITE_LOCAL_STORAGE_SECRET_KEY as string;
    const maxSize = import.meta.env.VITE_LOCAL_STORAGE_MAX_SIZE as number;

    const history = new Queue<WeatherHistoryItemDto>(getWeatherHistoryItems());

    history.enqueue(item);

    if (history.size() > maxSize) {
      history.dequeue();
    }

    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(history.getItems()),
      secretKey
    ).toString();

    localStorage.setItem(historyKey, encryptedData);
  } catch (err) {
    throw err;
  }
};

/**
 * Gets the weather history items from the local storage.
 * The history is decrypted using AES decryption before being returned.
 *
 * @returns {Queue<WeatherHistoryItemDto>} The weather history items.
 */
export const getWeatherHistoryItems = (): WeatherHistoryItemDto[] => {
  const historyKey = import.meta.env.VITE_LOCAL_STORAGE_KEY as string;
  const secretKey = import.meta.env.VITE_LOCAL_STORAGE_SECRET_KEY as string;

  const encryptedHistory = localStorage.getItem(historyKey);

  if (!encryptedHistory) {
    return [];
  }

  const decryptedHistory = CryptoJS.AES.decrypt(
    encryptedHistory,
    secretKey
  ).toString(CryptoJS.enc.Utf8);

  return JSON.parse(decryptedHistory);
};
