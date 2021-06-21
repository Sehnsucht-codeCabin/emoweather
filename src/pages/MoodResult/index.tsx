import styles from "./index.module.scss";
import MoodCity from "./children/MoodCity";
import WeatherIcon from "./children/WeatherIcon";
import MoodWeather from "./children/MoodWeather";
import useGeoGraphicalLocation from "../../hooks/useGeoGraphicalLocation";

const MoodResult = () => {
  const geographicalLocation = useGeoGraphicalLocation();
  if (!geographicalLocation) return null;

  if (typeof geographicalLocation === "string") {
    return <div className={styles.noResultsContainer}>{geographicalLocation}</div>;
  }

  const {
    city,
    country,
    weather: {
      weather_state_name: weatherStateName,
      humidity,
      min_temp: minTemp,
      the_temp: theTemp,
      max_temp: maxTemp,
      wind_speed: windSpeed,
      weather_state_abbr: weatherAbbr,
    },
  } = geographicalLocation;

  return (
    <section>
      <div className={styles.resultsContainer}>
        <MoodCity city={city} country={country} />
        <MoodWeather
          weatherData={{
            weatherStateName,
            humidity,
            theTemp,
            minTemp,
            maxTemp,
            windSpeed,
          }}
        />
        <WeatherIcon weatherAbbr={weatherAbbr} />
      </div>
    </section>
  );
};

export default MoodResult;