import { nanoid } from "@reduxjs/toolkit";
import { useLocation } from "react-router";
import useInput from "../../../../hooks/useInput";
import KeyWord from "../../../KeyWord";
import styles from "../../index.module.scss";

const RegularSearchBar = () => {
    const location = useLocation();
    
    const {
        queryMood,
        removeKeyWord,
        changeText,
        keyWords,
        currentValue,
        activeButton,
        hintContent
    } = useInput();

    return (
        <>
            <form
                onSubmit={queryMood}
                className={styles.moodInputForm}
                action=""
                data-variant="keyword"
                data-test="search-form"
            >
                <div className={styles.moodInputContainer}>
                {!!keyWords.length ? (
                    <div className={styles.keyWordsContainer}>
                    {keyWords.map((keyWord) => <KeyWord keyWord={keyWord} key={nanoid()} removeKeyWord={removeKeyWord} />)}
                    </div>
                ) : null}
                    <input
                    onChange={changeText}
                    type="text"
                    placeholder="I feel..."
                    className={styles.moodInput}
                    data-variant="keyword"
                    value={currentValue}
                    />
                
                </div>
                <div>
                    <button
                        disabled={!currentValue?.length && !activeButton}
                        id="search-box-btn"
                        type="submit"
                        className={styles.searchBoxButton}
                        data-variant="keyword"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                        </svg>
                    </button>
                </div>
            </form>
            {location.pathname !== "/result" ? (
                <p data-test="hint-content" className={styles.hint}>{hintContent}</p>
            ) : null}
        </>
    );
}

export default RegularSearchBar;