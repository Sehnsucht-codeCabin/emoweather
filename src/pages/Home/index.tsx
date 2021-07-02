import SearchBar from "../../uiLibrary/SearchBar";
import styles from "./index.module.scss";
import { EMOTICON } from "../../constants";
import { useContext } from "react";
import EmoweatherContext from "../../context";
import { ContextType } from "../../commonTypings";

const Home = () => {
    const { setTriggerUiElement } = useContext(EmoweatherContext) as ContextType;

    const toggleEmoticonsModal = () => {
        document.body.style.overflow = "hidden";
        setTriggerUiElement({ setEventListener: true, uiReference: EMOTICON, eventType: ["keyup", "click"] });
    } 

    return (
        <div data-test="content-container" className={styles.contentContainer}>
            <div className={styles.bodyTitleContainer}>
                <h1 className={styles.mainTitle}>How are you feeling today?</h1>
                <p className={styles.subtitle}>Find the city where your current mood belongs to.</p>
            </div>
            <SearchBar />
            <div className={styles.emoticonBtnWrapper}>
                <button data-test="emoticon-button" data-info="initiator" id="toggleEmoticonIconsBtn" type="submit" className={styles.emoticonBtn} onClick={toggleEmoticonsModal}>No, emoticon me!</button>
            </div>
        </div>
    );
};

export default Home;
