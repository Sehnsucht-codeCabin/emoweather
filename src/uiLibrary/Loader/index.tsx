import Spinner from "react-spinner-material";
import styles from "./index.module.scss";

const Loader = () => {
    return (
        <div className={styles.splashScreen}>
            <Spinner radius={180} color="#333" stroke={7} visible />
        </div>
    );
}

export default Loader;
