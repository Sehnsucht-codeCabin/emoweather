import styles from "./index.module.scss";

const MoodCity = ({ city, country } : {city: string, country: string }) => {
  return (
    <div className={styles.titleContainer}>
      <p>You should be in</p>
      <h1>{`${city}, ${country}`}</h1>
    </div>
  );
};

export default MoodCity;