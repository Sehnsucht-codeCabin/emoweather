import styles from "./index.module.scss";
import React from "react";
import emoticons from "../../../../assets/emoticons";

interface IKeyWord {
    term: string,
    active: boolean,
    key: string
}

const Emoticons = ({ setEmoticonMood, addedEmoticons } : { setEmoticonMood: React.MouseEventHandler<HTMLButtonElement>, addedEmoticons: IKeyWord[]} ) => {
    return (
        <div className={styles.emoticonWrapper}>
            {Object.keys(emoticons).map(emoticon => {
                const { html, key } = emoticons[emoticon];
                
                const addedEmoticon = addedEmoticons.find(addedEmoticon => addedEmoticon.term === emoticon);
                if (addedEmoticon) return null;

                return <button data-test={`emoticon-button-${emoticon}`} data-mood={emoticon} onClick={setEmoticonMood} key={key}>
                    <svg viewBox="0 0 384 384" xmlns="http://www.w3.org/2000/svg">
                        {html}
                    </svg>
                </button>;
            })}
        </div>
    );
}

export default Emoticons;