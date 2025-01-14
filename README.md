# Today's Weather ReactJS Application

**To make it work on local, add the following to *.env.local***
VITE_OPEN_WEATHER_API_BASE_URL=https://api.openweathermap.org/data/2.5/weather

VITE_OPEN_WEATHER_API_KEY=*YOUR_API_KEY*

VITE_LOCAL_STORAGE_KEY=*YOUR_KEY_TO_IDENTIFY_SEARCH_HISTORY_FROM_LOCAL_STORAGE*

VITE_LOCAL_STORAGE_SECRET_KEY=*YOUR_SECRET_KEY_FOR_ENCRYPTING_SEARCH_HISTORY* 

VITE_LOCAL_STORAGE_MAX_SIZE=10

**Functional Requirements & Assumptions:**

1. Search Bar
    1. User can search city or country and see today’s weather after clicking search button
    2. Autocomplete field to show city & country while user is typing
    3. Disable search button if input is empty
2. Today’s Weather Display Area
    1. Show the following information:
        1. City, Country
        2. Weather
        3. Description
        4. Temperature
        5. High Temperature
        6. Low Temperature
        7. Humidity
        8. Search Date Time
        9. Icon (optional)
3. Search History
    1. All searches are included in search history 
    2. Maximum 10 (configurable from .env.local) records are kept
    3. Store at local storage
    4. Display in descending order of search time
    5. Show the following information for each history item
        1. City, Country
        2. Search Date Time
        3. Search button
        4. Delete button
    6. Search Button: Upon click, search the city again and show it in search result (Not showing in search bar)
    7. Delete button: Upon click, remove it from search history and storage (no change to search bar & search result)

**Incomplete/Pending Tasks:**
1. Layout adjustment & Styling for search result content
