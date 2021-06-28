import { nanoid } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { EMOTICON } from "../constants";
import { uiReferenceSelector } from "../store/selectors";
import { triggerUiElement } from "../store/slices/documentEventListenerSlice";

interface IKeyWord {
    term: string,
    active: boolean,
    key: string
}

const useInput = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const uiReference = useSelector(uiReferenceSelector);

    const [keyWords, setKeyWords] = useState<IKeyWord[]>([]);
    const [activeButton, setActiveButton] = useState(false);
    const [emoticonForm] = useState(uiReference === EMOTICON);
    const [currentValue, setCurrentValue] = useState<string | undefined>("");
    const [hintContent, setHintContent] = useState("");

    const insertMood = (value : string) => {
        if (!emoticonForm && (!value || (value && value[value.length - 1] !== ","))) return;

        console.log(value);

        const cleanValue = value?.slice(0, -1);
        const termOnList = keyWords.find((keyWord : IKeyWord) => keyWord.term === cleanValue);
        setCurrentValue("");
        if (termOnList) {
            setHintContent(`The term '${cleanValue}' is already listed`);
            return;
        }

        setHintContent("");
        let currentKeyWords : IKeyWord[] = [...keyWords]; 
        currentKeyWords.push({
            term: cleanValue,
            active: true,
            key: nanoid()
        });
        setActiveButton(true);
        setKeyWords(currentKeyWords);
    };

    const changeText : React.ChangeEventHandler<HTMLInputElement> = (event) => {
        event.preventDefault();
        const { currentTarget } = event;
        const value = currentTarget.value;
        setCurrentValue(value);
        insertMood(value);
        if (value && value.length > 0 && !value.includes(",")) setHintContent(value ? `Press Comma to add '${value}'` : "");
        if (value === "") setHintContent("");
    };

    const setEmoticonMood: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        const { currentTarget } = event;
        const value = currentTarget.dataset.mood;
        setCurrentValue(value);
        if (value) insertMood(value);
        if (value && value.length > 0 && !value.includes(",")) setHintContent(value ? `Press Comma to add '${value}'` : "");
        if (value === "") setHintContent("");
    };

    const queryMood : React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        if (emoticonForm) {
            document.body.style.overflow = "auto";
            dispatch(triggerUiElement({ setEventListener: false, uiReference: null, eventType: null }));
        }

        const query = keyWords.filter(keyword => !!keyword.active);
        const term : string[] | null = query.length ? [query[0].term] : (currentValue ? [currentValue] : null);
        if (term) {
            history.push({
                pathname: "/result",
                state: {
                    moods: term,
                },
            });
        }
        
    };

    const removeKeyWord : React.MouseEventHandler<HTMLButtonElement> = (event) => {
        const currentKeyWords = [...keyWords];
        
        for (let index = 0; index < currentKeyWords.length; index++) {
        if (currentKeyWords[index].term === event.currentTarget.dataset.term) {
            currentKeyWords[index].active = !currentKeyWords[index].active;
            break;
        }
        }
        
        setActiveButton(!!currentKeyWords.filter(keyWord => keyWord.active === true).length);
        setKeyWords(currentKeyWords);
    };

    return {
        queryMood,
        removeKeyWord,
        changeText,
        setEmoticonMood,
        keyWords,
        currentValue,
        activeButton,
        hintContent
    }

}

export default useInput;