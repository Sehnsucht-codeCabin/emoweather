import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { EMOTICON } from "../../constants";
import { uiReferenceSelector } from "../../store/selectors";
import { triggerUiElement } from "../../store/slices/documentEventListenerSlice";
import EmoticonSearchBar from "./variant/emoticon";
import RegularSearchBar from "./variant/regular";

const SearchBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const uiReference = useSelector(uiReferenceSelector);

  const [hintContent, setHintContent] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [keyWords, setKeyWords] = useState([]);
  const [activeButton, setActiveButton] = useState(false);
  const [emoticonForm] = useState(uiReference === EMOTICON);

  const insertMood = (value) => {
    const validValue = !emoticonForm ? value.length > 1 && value[0] !== "," && value[value.length - 1] === "," : true;
    const cleanValue =
      !emoticonForm && validValue && !keyWords.includes(value.slice(0, -1))
        ? value.slice(0, -1)
        : null;
    if (emoticonForm || cleanValue) {
      const termOnList = keyWords.find(keyWord => keyWord.term === (emoticonForm ? value : cleanValue));
      setCurrentValue("");
      if (!!termOnList) {
        setHintContent(`The term '${cleanValue}' is already listed`);
        return;
      }

      setHintContent("");
      let currentKeyWords = [...keyWords];
      currentKeyWords.push({
        term: emoticonForm ? value : cleanValue,
        active: true,
        key: Math.random().toString(36).substring(7)
      });
      setActiveButton(true);
      setKeyWords(currentKeyWords);
    }
  };

  const changeText = (event) => {
    event.preventDefault();
    let value = !emoticonForm ? event.currentTarget.value : event.currentTarget.dataset.mood;
    setCurrentValue(value);
    insertMood(value);
    if (value.length > 0 && !value.includes(",")) {
      setHintContent(value ? `Press Comma to add '${value}'` : "");
    }
    if (value === "") {
      setHintContent("");
    }
  };

  const queryMood = event => {
    event.preventDefault();
    if (emoticonForm) {
      document.body.style.overflow = "auto";
      dispatch(triggerUiElement({ setEventListener: false, uiReference: null, eventType: null }));
    }

    const query = [keyWords.filter(keyword => !!keyword.active)[0].term]; // THIS WILL DO FOR NOW!
    history.push({
      pathname: "/result",
      state: {
        moods: query,
      },
    });
  };

  const removeKeyWord = (event) => {
    const currentKeyWords = [...keyWords];
    const selectedKeyWord = currentKeyWords.find(keyWord => keyWord.term === event.currentTarget.dataset.term);
    const index = currentKeyWords.indexOf(selectedKeyWord);
    selectedKeyWord.active = !selectedKeyWord.active;
    currentKeyWords[index] = selectedKeyWord;
    setActiveButton(!!currentKeyWords.filter(keyWord => keyWord.active === true).length ? true : false);
    setKeyWords(currentKeyWords);
  };

  const searchBarFunctionalities = {
    queryMood,
    removeKeyWord,
    changeText,
    keyWords,
    currentValue,
    activeButton,
    hintContent
  }

  return emoticonForm ? <EmoticonSearchBar searchBarFunctionalities={searchBarFunctionalities} /> : <RegularSearchBar searchBarFunctionalities={searchBarFunctionalities} />

};

export default SearchBar;