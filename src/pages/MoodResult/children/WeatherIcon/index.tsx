import styles from "./index.module.scss";

const WeatherIcon = ({ weatherAbbr }: { weatherAbbr: string }) => {
  return (
    <div className={styles.weatherFlagContainer}>
      <img
        alt="Weather Icon"
        src={`https://www.metaweather.com/static/img/weather/png/${weatherAbbr}.png`}
      />
    </div>
  );
};

export default WeatherIcon;