import styles from "./index.module.scss";
import emoticons from "../../../../../../assets/emoticons";

const Emoticons = ({ changeText }) => {
    return (
        <div className={styles.emoticonWrapper}>
            {Object.keys(emoticons).map(emoticon => {
                return <button data-mood={emoticon} onClick={changeText} key={emoticons[emoticon].key}>
                    <svg viewBox="0 0 384 384" xmlns="http://www.w3.org/2000/svg">
                        {emoticons[emoticon].html}
                    </svg>
                </button>;
            })}
        </div>
    );
}

export default Emoticons;