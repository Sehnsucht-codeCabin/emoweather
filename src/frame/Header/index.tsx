import styles from "./index.module.scss";
import logo from "./resources/emoweather-logo.svg";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import SearchBar from "../../uiLibrary/SearchBar";
import { ABOUT } from "../../constants";
import { triggerUiElement } from "../../store/slices/documentEventListenerSlice";

const Header = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const navigateToIndex = () => {
      history.push({
          pathname: '/',
      });
    }

    const toggleAboutModal = () => dispatch(triggerUiElement({ setEventListener: true, uiReference: ABOUT, eventType: ["keyup", "click"] }));
      
    return (
      <header>
        <div className={styles.navWrapper}>
          <div className={styles.logo} onClick={navigateToIndex}>
            <img alt="emoweather logo" src={logo} />
          </div>
          <div className={styles.middleContainer}>
            {location.pathname === "/result" ? (
              <div className={styles.searchBarContainer}><SearchBar /></div>
            ) : null}
            <div className={styles.about} onClick={toggleAboutModal}>
              <svg viewBox="0 0 286.054 286.054" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M143.027,0C64.04,0,0,64.04,0,143.027c0,78.996,64.04,143.027,143.027,143.027
                    c78.996,0,143.027-64.022,143.027-143.027C286.054,64.04,222.022,0,143.027,0z M143.027,259.236
                    c-64.183,0-116.209-52.026-116.209-116.209S78.844,26.818,143.027,26.818s116.209,52.026,116.209,116.209
                    S207.21,259.236,143.027,259.236z M143.036,62.726c-10.244,0-17.995,5.346-17.995,13.981v79.201c0,8.644,7.75,13.972,17.995,13.972
                    c9.994,0,17.995-5.551,17.995-13.972V76.707C161.03,68.277,153.03,62.726,143.036,62.726z M143.036,187.723
                    c-9.842,0-17.852,8.01-17.852,17.86c0,9.833,8.01,17.843,17.852,17.843s17.843-8.01,17.843-17.843
                    C160.878,195.732,152.878,187.723,143.036,187.723z"
                />
              </svg>
            </div>
            
          </div>
          <div style={{width:"172px"}}></div>
        </div>
        <div className={styles.githubWrapper}>
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/Sehnsucht-codeCabin/emoweather" className={styles.githubCornerAnchor} aria-label="View source on GitHub">
            <svg
              width="80"
              height="80"
              viewBox="0 0 250 250"
              aria-hidden="true"
            >
              <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
              <path
                d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
                fill="currentColor"
                className={styles.octoArm}
              />
              <path
                d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
      </header>
    );
  };
  
  export default Header;
