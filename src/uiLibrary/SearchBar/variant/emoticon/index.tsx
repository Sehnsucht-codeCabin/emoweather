import emoticons from "../../../../assets/emoticons";
import styles from "../../index.module.scss";
import useInput from "../../../../hooks/useInput";
import { nanoid } from "@reduxjs/toolkit";
import Emoticons from "../../children/Emoticons";

const EmoticonsModal = () => {
    const {
        queryMood,
        setEmoticonMood,
        keyWords,
        currentValue,
        activeButton
    } = useInput();

    return (
        <>
            <form
                onSubmit={queryMood}
                className={styles.moodInputForm}
                action=""
                data-variant="emoticon"
                data-test="search-form"
            >
                <div className={styles.moodInputContainer}>
                    {keyWords.length ? (
                        <div className={styles.keyWordsContainer}>
                            {keyWords.map((keyWord) => {
                                const { term } = keyWord;
                                const { html } = emoticons[term];
                                return (
                                    <div className={styles.emoticonWrapper} data-test="emoticon" key={nanoid()}>
                                        <svg viewBox="0 0 384 384" xmlns="http://www.w3.org/2000/svg">
                                            {html}
                                        </svg>
                                    </div>
                                );
                            })}
                        </div>
                    ) : null}
                </div>
                <div>
                    <button
                        disabled={!currentValue?.length && !activeButton}
                        id="search-box-btn"
                        type="submit"
                        className={styles.searchBoxButton}
                        data-variant="emoticon"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                        </svg>
                    </button>
                </div>
            </form>
            <Emoticons setEmoticonMood={setEmoticonMood} />
        </>
    );
}

export default EmoticonsModal;