import styles from "./index.module.scss";

const AboutModal = () => {
    return (
        <>
            <p className={styles.aboutModalParagraph}>Research has confirmed what we as living beings have suspicioned for quite some time: weather has indeed an impact on our mood and behaviour in different ways and intensity levels.</p>
            <p className={styles.aboutModalParagraph}>Such premise is the backbone of Emoweather which aims to stablish a more or less direct relation between human moods and the weather and therefore fetch a geographic location on earth as the intended outcome.</p>
            <p className={styles.aboutModalParagraph}>All weather data is provided by a <a target="_blank" rel="noopener noreferrer" href="https://www.metaweather.com/">free weather api</a> which feeds on an array of sources like <a target="_blank" rel="noopener noreferrer" href="https://www.bbc.com/weather">BBC</a> and <a target="_blank" rel="noopener noreferrer" href="https://openweathermap.org/">OpenWeather</a>.</p>
            <p className={styles.aboutModalParagraph}>Be aware that this is an ongoing project and many factors beyond lower or higher temperatures have an influence on our state of mind so I'm sorry in advance if by any chance any upcoming result does not match your current mood in the most accurate fashion. I hope you enjoy it anyways.</p>
            <p className={styles.aboutModalParagraph}>Get to know my other projects at <a target="_blank" href="http://www.marcoabilio.com/" rel="noopener noreferrer">marcoabilio.com</a> or fork me in <a href="https://github.com/Sehnsucht-codeCabin/emoweather" target="_blank" rel="noopener noreferrer">GitHub</a>. If you have any other questions, feel free to <a href="mailto:marc.e.mailing@gmail.com">drop me an email</a>.</p>
            <p className={styles.aboutModalParagraph}>Cheers!</p>
            
        </>
    );
}

export default AboutModal;