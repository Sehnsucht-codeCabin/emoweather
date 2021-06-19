import styles from "./index.module.scss";
import emoticons from "../../../../../../assets/emoticons";
import React from "react";

const Emoticons = ({ setEmoticonMood } : { setEmoticonMood: React.MouseEventHandler<HTMLButtonElement>}) => {
    return (
        <div className={styles.emoticonWrapper}>
            {Object.keys(emoticons).map(emoticon => {
                const { html, key } = emoticons[emoticon];
                return <button data-mood={emoticon} onClick={setEmoticonMood} key={key}>
                    <svg viewBox="0 0 384 384" xmlns="http://www.w3.org/2000/svg">
                        {html}
                    </svg>
                </button>;
            })}
        </div>
    );
}

export default Emoticons;