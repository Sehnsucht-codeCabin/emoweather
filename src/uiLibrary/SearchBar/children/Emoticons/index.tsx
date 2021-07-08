import styles from "./index.module.scss";
import React, { useState } from "react";
import emoticons from "../../../../assets/emoticons";

const Emoticons = ({ setEmoticonMood } : { setEmoticonMood: (value: string) => void } ) => {
    const [addedEmoticons, setAddedEmoticons] = useState<string[]>([]);

    const onSetEmoticonMood : React.MouseEventHandler<HTMLButtonElement> = (event) => {
        const { currentTarget } = event;
        const value = currentTarget.dataset.mood;
        if (value) {
            const newAddedEmoticons : string[] = [...addedEmoticons];
            newAddedEmoticons.push(value);
            setAddedEmoticons(newAddedEmoticons);
            setEmoticonMood(value);
        }
    };

    return (
        <div className={styles.emoticonWrapper}>
            {Object.keys(emoticons).map(emoticon => {
                const { html, key } = emoticons[emoticon];
                
                if (addedEmoticons.includes(emoticon)) return null;
                return <button data-test={`emoticon-button-${emoticon}`} data-mood={emoticon} onClick={onSetEmoticonMood} key={key}>
                    <svg viewBox="0 0 384 384" xmlns="http://www.w3.org/2000/svg">
                        {html}
                    </svg>
                </button>;
            })}
        </div>
    );
}

export default Emoticons;