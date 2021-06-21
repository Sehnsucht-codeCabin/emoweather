import SearchBar from "../../uiLibrary/SearchBar";
import styles from "./index.module.scss";
import { useDispatch } from "react-redux";
import { triggerUiElement } from "../../store/slices/documentEventListenerSlice";
import { EMOTICON } from "../../constants";

const Home = () => {
    const dispatch = useDispatch();

    const toggleEmoticonsModal = () => {
        document.body.style.overflow = "hidden";
        dispatch(triggerUiElement({ setEventListener: true, uiReference: EMOTICON, eventType: ["keyup", "click"] }));
    } 

    return (
        <div className={styles.contentContainer}>
            <div className={styles.bodyTitleContainer}>
                <h1 className={styles.mainTitle}>How are you feeling today?</h1>
                <p className={styles.subtitle}>Find the city where your current mood belongs to.</p>
            </div>
            <SearchBar />
            <div className={styles.emoticonBtnWrapper}>
                <button data-info="initiator" id="toggleEmoticonIconsBtn" type="submit" className={styles.emoticonBtn} onClick={toggleEmoticonsModal}>No, emoticon me!</button>
            </div>
        </div>
    );
};

export default Home;
