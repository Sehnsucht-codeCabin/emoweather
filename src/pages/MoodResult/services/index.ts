import moodStates from "../../../assets/moodStates";
const moodKeys = Object.keys(moodStates);
const base = "https://api.allorigins.win/raw?url=";
const metaWeatherApi = `${base}https://www.metaweather.com`;
const dataMuseApi = `https://api.datamuse.com`;

const getCitiesWoeids = (filteredCities: string[]) => {
  return Promise.allSettled(
    filteredCities.map((city) =>
      fetch(`${metaWeatherApi}/api/location/search/?query=${city}`)
        .then((response) => response.json())
        .then((data) => data[0].woeid)
    )
  );
};

const getCitiesWeather = (woeids: number[]) => {
  return Promise.allSettled(
    woeids.map((woeid) =>
      fetch(`${metaWeatherApi}/api/location/${woeid}`).then((response) =>
        response.json()
      )
    )
  );
};

const getMoodGroup = (mood: string) => {
  return Promise.allSettled(
    moodKeys.map((moodKey) =>
      fetch(`${dataMuseApi}/words?ml=${moodKey}&sp=${mood}`)
        .then(response => response.json())
        .then(response => ({
          moodKey,
          response,
        }))
    )
  );
};

export { getCitiesWoeids, getCitiesWeather, getMoodGroup };