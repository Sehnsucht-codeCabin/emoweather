import styles from "./index.module.scss";

const Footer = () => {
  return (
    <div className={styles.copyrightData}>
      <p>
        Emoweather @ 2019. Weather data from <a href="https://www.metaweather.com/">metaweather.com</a>
      </p>
    </div>
    
  );
};

export default Footer;