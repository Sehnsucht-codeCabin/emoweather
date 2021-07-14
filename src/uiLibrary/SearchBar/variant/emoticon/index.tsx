import useInput from "../../../../hooks/useInput";
import Emoticons from "../../children/Emoticons";
import styles from "./index.module.scss";

const EmoticonsModal = () => {
    const {
        queryMood,
        insertMood,
        activeButton
    } = useInput();

    return (
        <>
            <Emoticons setEmoticonMood={insertMood} />
            <button disabled={!activeButton}
                    id="search-box-btn"
                    type="submit"
                    className={styles.submitButton}
                    onClick={queryMood}>
                        Submit
            </button>
        </>
    );
}

export default EmoticonsModal;