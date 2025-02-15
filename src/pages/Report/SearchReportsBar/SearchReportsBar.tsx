import React from "react";
import s from "./SearchReportsBar.module.scss";


import searchIcon from "../../../assets/btnImg/searchBtn.svg"

interface SearchReportsBarProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onSubmit?: () => void;
  placeholder?: string;
}

const SearchReportsBar: React.FC<SearchReportsBarProps> = ({
  value,
  onChange,
  onFocus,
  onBlur,
  onSubmit,
  placeholder = "찾는 리포트를 검색해보세요",
}) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && onSubmit) {
      onSubmit();
    }
	};
	

	
  return (
    <div className={s.searchBarContainer}>
      <div className={s.searchBar}>
        <button className={s.searchButton} type="submit" onClick={onSubmit}>
          <img src={searchIcon} alt="searchIcon" />
        </button>
        <input
          className={s.searchInput}
          type="text"
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={handleKeyPress}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default SearchReportsBar;
