import { useSelector } from "react-redux";
import { EMOTICON } from "../../constants";
import { uiReferenceSelector } from "../../store/selectors";
import EmoticonSearchBar from "./variant/emoticon";
import RegularSearchBar from "./variant/regular";

const SearchBar = () => {
  const uiReference = useSelector(uiReferenceSelector);
  return uiReference === EMOTICON ? <EmoticonSearchBar /> : <RegularSearchBar />
};

export default SearchBar;