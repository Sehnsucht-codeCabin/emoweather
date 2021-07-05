import styles from "./index.module.scss";

interface IKeyWord {
    term: string,
    active: boolean,
    key: string
}

const KeyWord = ({ keyWord, removeKeyWord } : { keyWord: IKeyWord, removeKeyWord: React.MouseEventHandler<HTMLButtonElement>}) => {
  const { term, active } = keyWord;
  return (
    <div className={styles.keyWordContainer} data-test={`keyword-${active ? "enabled" : "disabled"}`} data-variant={active ? "enabled" : "disabled"}>
      <div>
        <span data-test="term">{term}</span>
        <span data-variant={active ? "enabled" : "disabled"}></span>
      </div>
      <button type="button" data-test="remove-keyword-button" data-term={term} onClick={removeKeyWord}>
        {active ? <svg viewBox="0 0 20 20">
							<path d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
						</svg> : <svg viewBox="0 0 20 20">
							<path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"></path>
						</svg>}
      </button>
    </div>
  );
};

export default KeyWord;