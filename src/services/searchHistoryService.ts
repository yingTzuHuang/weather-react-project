import CryptoJS from "crypto-js";
import Queue from "../classes/Queue";

const historyKey = import.meta.env.VITE_LOCAL_STORAGE_KEY as string;
const secretKey = import.meta.env.VITE_LOCAL_STORAGE_SECRET_KEY as string;
const maxSize = import.meta.env.VITE_LOCAL_STORAGE_MAX_SIZE as number;

export interface SearchHistoryItemDto {
  id: number;
  city: string;
  searchDateTime: Date;
}

/**
 * Encrypts and stores the given weather history items in local storage.
 *
 * @param {SearchHistoryItemDto[]} historyItems - The weather history items to store.
 */
const mutatedHistoryItems = (historyItems: SearchHistoryItemDto[]) => {
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(historyItems),
    secretKey
  ).toString();
  localStorage.setItem(historyKey, encryptedData);
};

/**
 * Gets the weather history items from the local storage.
 * The history is decrypted using AES decryption before being returned.
 *
 * @returns {Queue<SearchHistoryItemDto>} The weather history items.
 */
export const getWeatherHistoryItems = (): SearchHistoryItemDto[] => {
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

/**
 * Adds a weather history item to the local storage.
 * The item is encrypted using AES encryption before being stored.
 * If the history exceeds the maximum size, the oldest item is removed.
 * @param {SearchHistoryItemDto} item - The weather history item to add.
 * @returns {void}
 */
export const addItemToSearchHistory = (item: SearchHistoryItemDto): void => {
  try {
    const history = new Queue<SearchHistoryItemDto>(getWeatherHistoryItems());

    history.enqueue(item);

    if (history.size() > maxSize) {
      history.dequeue();
    }

    mutatedHistoryItems(history.getAllItems());
  } catch (err) {
    throw err;
  }
};

/**
 * Deletes a weather history item from the list of history items and update the local storage.
 *
 * @param item - The weather history item to be deleted.
 * @returns A boolean indicating whether the item was successfully deleted.
 * @throws Will throw an error if there is an issue during the deletion process.
 */
export const deleteSearchHistoryItem = (id: number): boolean => {
  try {
    const historyItems = getWeatherHistoryItems();
    const index = historyItems.findIndex((h) => h.id === id);

    // Remove the item if it exists
    if (index > -1) {
      historyItems.splice(index, 1);
      mutatedHistoryItems(historyItems);
      return true;
    }

    return false;
  } catch (err) {
    throw err;
  }
};
