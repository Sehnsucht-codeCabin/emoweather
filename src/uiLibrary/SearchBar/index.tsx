import { useContext } from "react";
import { ContextType } from "../../commonTypings";
import { EMOTICON } from "../../constants";
import EmoweatherContext from "../../context";
import EmoticonSearchBar from "./variant/emoticon";
import RegularSearchBar from "./variant/regular";

const SearchBar = () => {
  const { triggerUiElement } = useContext(EmoweatherContext) as ContextType;
  const { uiReference } = triggerUiElement;
  return uiReference === EMOTICON ? <EmoticonSearchBar /> : <RegularSearchBar />
};

export default SearchBar;