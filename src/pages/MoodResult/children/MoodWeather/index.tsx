import { nanoid } from "@reduxjs/toolkit";
import styles from "./index.module.scss";

interface IWeatherData {
    [key : string]: any
}

const MoodWeather = ({ weatherData }: { weatherData: IWeatherData}) => {
    
    const roundTemp = (temp : number) => {
        const newTemp = Array.from(String(temp));
        const generatedArray = newTemp.splice(0, newTemp.length - 1 - newTemp.indexOf(".") + 1);
        return Math.round(Number(generatedArray.join("")));
    };

    const { weatherStateName } = weatherData;

    return (
        <div className={styles.weatherDataContainer}>
        <p>{weatherStateName}</p>
        <div className={styles.weatherData}>
            <div>
            {[{ key: "humidity", label: "humidity", unit: "%" }, { key: "minTemp", label: "min.", unit: "ºC" }, { key: "theTemp", unit: "ºC"}, { key: "maxTemp", label: "max.", unit: "ºC" }, { key: "windSpeed", label: "wind", unit: "mph" }].map(data => {
                const { key, label, unit } = data;
                return (
                    <p key={nanoid()}>
                        {label && (
                            <>
                                <span className={styles.dataTitle}>{label}</span>
                                <span className={styles.dataValue}>{`${roundTemp(weatherData[key])}${unit}`}</span> 
                            </>
                        )}
                        {!label && <span className={styles.centerValue}>{`${roundTemp(weatherData[key])}${unit}`}</span>}
                    </p>
                )
            })}
            </div>
        </div>
        </div>
    );
};

export default MoodWeather;