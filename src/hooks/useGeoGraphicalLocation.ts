import { useCallback, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getCitiesWeather, getCitiesWoeids, getMoodGroup } from "../pages/MoodResult/services";
import moodStates from "../assets/moodStates";
import { filterAsyncCallResponse } from "../helpers";
import EmoweatherContext from "../context";
import { ContextType } from "../commonTypings";

type value = {
  moodKey: string, 
  response: {
    score: number,
    tags: string[],
    word: string
  }[]
}

interface IGeographicalLocation {
    city: string,
    country: string,
    weather: {
        weather_state_name: string,
        humidity: number,
        min_temp: number,
        the_temp: number,
        max_temp: number,
        wind_speed: number,
        weather_state_abbr: string
    },
}

const useGeoGraphicalLocation = () => { 
    const { state } : { state: { moods: string[]} } = useLocation();
    const [currentLocationState, setCurrentLocationState] = useState(state);
    const [moodGroup, setMoodGroup] = useState<{ cities: any, group: string } | undefined>();
    const [citiesWoeids, setCitiesWoeids] = useState<number[] | undefined>([]);
    const [citiesWeather, setCitiesWeather] = useState<{ [key: string]: any }[] | undefined>();
    const [geographicalLocation, setGeoGraphicalLocation] = useState<IGeographicalLocation | string>();
    const [moodKeys] = useState(Object.keys(moodStates));

    const { activateLoader } = useContext(EmoweatherContext) as ContextType;

    const onSetWinnerMood = useCallback(async (moods) => {
        let moodGroupsScore : {
            [key: string]: number
        } = {};

        const setMoodGroupScore = (resolvedPromises : Array<{ moodKey: string }>) => {
            if (!moodGroupsScore) moodGroupsScore = {};
            resolvedPromises.forEach(promise => {
                if (!moodGroupsScore[promise.moodKey]) moodGroupsScore[promise.moodKey] = 1;
                if (!!moodGroupsScore[promise.moodKey]) moodGroupsScore[promise.moodKey] = moodGroupsScore[promise.moodKey] + 1;
            });
        }

        for (let index = 0; index < moods.length; index++) {
            const response : any = await getMoodGroup(moodKeys, moods[index]);
            const { errorMessages, resolvedPromises } : { errorMessages: string[], resolvedPromises: value[]} = filterAsyncCallResponse(response);
            if (errorMessages.length) {
                setGeoGraphicalLocation("Something went wrong. Please, try again.");
                activateLoader(false);
                return;
            }
            if (resolvedPromises.length) setMoodGroupScore(resolvedPromises);
        }

        if (Object.keys(moodGroupsScore).length) {
            const initialCount : { position: number, maxAmount: number } = {
                position: 0,
                maxAmount: 0
            };

            const moodGroupsScoreValues = Object.values(moodGroupsScore);
            const winnerMoodPosition = moodGroupsScoreValues.reduce((previous, current, index) => {
                const { position, maxAmount } = previous;
                const currentMaxAmount = Math.max(maxAmount, current);
                const currentPosition : number = currentMaxAmount === maxAmount ? position : index;
                return {
                    position: currentPosition,
                    maxAmount: currentMaxAmount
                }
            }, initialCount);

            const winnerMood = Object.keys(moodGroupsScore)[winnerMoodPosition.position];
            setMoodGroup({
                cities: moodStates[winnerMood],
                group: winnerMood,
            });
        } else {
            activateLoader(false);
            setGeoGraphicalLocation("No results found. Please, try again.");
        }

    }, [activateLoader, moodKeys]);

    const filterHotAndHottestStates = useCallback((humidity) => {
        if (citiesWeather) {
            const nonRainingStates : number[] = [];
            citiesWeather?.forEach((item, index) => {
                ["t", "c", "hc", "lc"].includes(item.consolidated_weather[0].weather_state_abbr) && nonRainingStates.push(index);
            });

            let currentMaxTempOrMaxHumidity = [];
            const tempOrHumidityKey = humidity ? "humidity" : "the_temp";
            if (!!nonRainingStates.length) {
                nonRainingStates.forEach((item) => currentMaxTempOrMaxHumidity.push(citiesWeather[item].consolidated_weather[0][tempOrHumidityKey]));
            }

            if (citiesWeather) currentMaxTempOrMaxHumidity = nonRainingStates.map((item) => citiesWeather[item].consolidated_weather[0][tempOrHumidityKey]);

            const highestHumidityOrTemp = Math.max.apply(
                Math,
                currentMaxTempOrMaxHumidity
            );

            let correctIndex;
            for (let index = 0; index < citiesWeather?.length; index++) {
                if (
                    citiesWeather && citiesWeather[index].consolidated_weather[0][tempOrHumidityKey] ===
                    highestHumidityOrTemp
                ) {
                    correctIndex = index;
                    break;
                }
            }
            return correctIndex;
        }
    }, [citiesWeather]);

    const compareObjects = useCallback((object1, object2) => {
        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);

        if (keys1.length !== keys2.length) return false;

        const isObject = (object : object) => object && typeof object === 'object' && !Array.isArray(object);
        for (const key of keys1) {
            const val1 = object1[key];
            const val2 = object2[key];
            const areObjects = isObject(val1) && isObject(val2);
            if ((areObjects && !compareObjects(val1, val2)) || (!areObjects && val1 !== val2)) return false;
        }

        return true;
    }, []);

    useEffect(() => {
        if (!compareObjects(state, currentLocationState)) {
            setCurrentLocationState(state);
            setMoodGroup(undefined);
            setCitiesWoeids(undefined);
            setCitiesWeather(undefined);
        }
    }, [currentLocationState, state, compareObjects]);

    useEffect(() => {
        const componentMounted = true;
        if (!moodGroup) {
            activateLoader(true);
            const sanitizedMoods = state.moods.map((mood) => mood.trim().toLowerCase());
            componentMounted && onSetWinnerMood(sanitizedMoods);
        }

    }, [moodGroup, state, onSetWinnerMood, activateLoader]);

    useEffect(() => {
        const componentMounted = true;
        if (moodGroup && !citiesWoeids?.length) {
            const maximumNumberOfCities = 5;
            const { cities } = moodGroup;
            const randomCities = maximumNumberOfCities > cities.length ? cities : cities.sort(() => Math.random() - 0.5).slice(0, maximumNumberOfCities);

            const onGetCitiesWoeids = async () => {

                const response : any = await getCitiesWoeids(randomCities);
                if (componentMounted) {
                    const { errorMessages, resolvedPromises } : { errorMessages: string[], resolvedPromises: number[]} = filterAsyncCallResponse(response);
                    if (errorMessages.length) {
                        setGeoGraphicalLocation("Something went wrong. Please, try again.");
                        activateLoader(false);
                        return;
                    }
                    if (resolvedPromises.length) setCitiesWoeids(resolvedPromises);
                }
            };
            onGetCitiesWoeids();
        }
    }, [moodGroup, citiesWoeids, activateLoader]);

    useEffect(() => {
        if (citiesWoeids?.length) {
            const componentMounted = true;
            const executeAsyncCall = async () => {
                const response : any = await getCitiesWeather(citiesWoeids)
                if (componentMounted) {
                    const { errorMessages, resolvedPromises } : { errorMessages: string[], resolvedPromises: any[] } = filterAsyncCallResponse(response);
                    if (errorMessages.length) {
                        setGeoGraphicalLocation("Something went wrong. Please, try again.");
                        activateLoader(false);
                        return;
                    }
                    if (resolvedPromises.length) setCitiesWeather(resolvedPromises);

                }
            };
            executeAsyncCall();
        }
    }, [activateLoader, citiesWoeids]);

    useEffect(() => {
        if (citiesWeather?.length) {
            const averageTemperature = citiesWeather.map(
                (item: any) => item.consolidated_weather[0].the_temp
            );
            let correctIndex;
            switch (moodGroup?.group) {
                case "down":
                case "warm":
                    const maxOrMin = moodGroup.group === "warm" ? "max" : "min";
                    correctIndex = averageTemperature.indexOf(
                        Math[maxOrMin].apply(Math, averageTemperature)
                    );
                    break;
                case "up":
                case "hottest":
                    const humidity = moodGroup.group === "hottest" ? true : false;
                    correctIndex = filterHotAndHottestStates(humidity);
                    break;
                default:
                    break;
            }
            if (correctIndex !== undefined) {
                setGeoGraphicalLocation({
                    city: citiesWeather[correctIndex].title,
                    country: citiesWeather[correctIndex].parent.title,
                    weather: citiesWeather[correctIndex].consolidated_weather[0],
                });
                activateLoader(false);
            }
        }
    }, [citiesWeather, moodGroup, filterHotAndHottestStates, activateLoader]);

    return geographicalLocation;

}

export default useGeoGraphicalLocation;