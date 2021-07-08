import { useContext } from "react";
import { ContextType } from "../../commonTypings";
import { ABOUT, EMOTICON } from "../../constants";
import EmoweatherContext from "../../context";
import EmoticonsModal from "../SearchBar/variant/emoticon";
import AboutModal from "./children/AboutModal";
import styles from "./index.module.scss";

const Modal = () => {
    const { triggerUiElement } = useContext(EmoweatherContext) as ContextType;
    const { uiReference } = triggerUiElement;

    const getHeader = () => {
        let modalHeader;
        switch(uiReference) {
            case ABOUT:
                modalHeader = "";
                break;
            default:
                modalHeader = "";
        }
        return modalHeader;
    }

    const ModalBody = () => {
        let modalBody;
        switch(uiReference) {
            case ABOUT:
                modalBody = <AboutModal />;
                break;
            case EMOTICON:
                modalBody = <EmoticonsModal />
                break;
            default:
                modalBody = null;
        }
        return modalBody;
    }

    const modalHeader = getHeader();

    return (
        <div data-test="modal-background" className={styles.modalBackground}>
            <div className={styles.modalContainer}>
                <button data-test="close-modal-button" className={styles.closeModalButton} data-info="close-modal">
                    <svg viewBox="0 0 20 20">
                            <path d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
                        </svg>
                </button>
                {!!modalHeader && <header>{modalHeader}</header>}
                <div className={styles.modalBodyContainer}>
                    <ModalBody />
                </div>
            </div>
        </div>
    );
}

export default Modal;