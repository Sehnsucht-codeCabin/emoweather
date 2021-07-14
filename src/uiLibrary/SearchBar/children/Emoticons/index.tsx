import styles from "./index.module.scss";
import React, { useState } from "react";
import emoticons from "../../../../assets/emoticons";

const Emoticons = ({ setEmoticonMood } : { setEmoticonMood: (value: string) => void } ) => {
    const [selectedEmoticons, setAddedEmoticons] = useState<string[]>([]);

    const onSetEmoticonMood : React.MouseEventHandler<HTMLButtonElement> = (event) => {
        const { currentTarget } = event;
        const value = currentTarget.dataset.mood;
        if (value) {
            const newSelectedEmoticons : string[] = [...selectedEmoticons];
            if (!selectedEmoticons.includes(value)) newSelectedEmoticons.push(value);
            if (selectedEmoticons.includes(value)) newSelectedEmoticons.splice(newSelectedEmoticons.indexOf(value), 1);
            setAddedEmoticons(newSelectedEmoticons);
            setEmoticonMood(value);
        }
    };

    return (
        <div className={styles.emoticonWrapper}>
            {Object.keys(emoticons).map(emoticon => {
                const { html, key } = emoticons[emoticon];
                
                const selectedEmoticon = selectedEmoticons.includes(emoticon) ? "selected" : "non-selected";
                return <button data-test={`emoticon-button-${emoticon}-${selectedEmoticon}`} data-variant={selectedEmoticon} data-mood={emoticon} onClick={onSetEmoticonMood} key={key}>
                    <svg viewBox="0 0 384 384" xmlns="http://www.w3.org/2000/svg">
                        {html}
                    </svg>
                </button>;
            })}
        </div>
    );
}

export default Emoticons;