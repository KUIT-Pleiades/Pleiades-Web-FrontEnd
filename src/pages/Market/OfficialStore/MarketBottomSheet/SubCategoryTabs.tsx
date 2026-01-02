import { useEffect, useState } from "react";
import s from "./SubCategoryTabs.module.scss";
import { CategoryType } from "../OfficialUsedStore";
import searchBtnGray from "../../../../assets/btnImg/searchBtn.svg";

interface SubCategoryTabsProps {
  activeCategory: CategoryType;
  isSearching: boolean;
  reverseSearch: () => void;
  activeSubTab: string;
  onSubTabChange: (subTab: string) => void;
  isFocus: boolean;
  setFocus: () => void;
  searchQuery?: string;
  onSearch?: (query: string) => void;
}

const SUB_CATEGORIES: Record<CategoryType, string[]> = {
  face: ["전체", "머리", "눈", "코", "입", "점"],
  cloth: ["전체", "상의", "하의", "세트", "신발", "악세서리"],
  background: ["전체", "별", "우주정거장"],
};

export default function SubCategoryTabs({
  activeCategory,
  isSearching,
  reverseSearch,
  activeSubTab,
  onSubTabChange,
  setFocus,
  searchQuery = "",
  onSearch,
}: SubCategoryTabsProps) {
  const tabs = SUB_CATEGORIES[activeCategory];
  const [inputValue, setInputValue] = useState(searchQuery);

  useEffect(() => {
    onSubTabChange("전체");
  }, [activeCategory, onSubTabChange]);

  // 검색어 디바운스 처리
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearch && inputValue !== searchQuery) {
        onSearch(inputValue);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, onSearch, searchQuery]);

  // 검색 모드 종료 시 입력값 초기화
  useEffect(() => {
    if (!isSearching) {
      setInputValue("");
    }
  }, [isSearching]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(inputValue);
    }
  };

  if (!tabs) {
    return null;
  }

  return (
    <div className={s.container}>
      {isSearching ? (
        <div className={s.searchContainer}>
          <img src={searchBtnGray} alt="search icon" className={s.searchIcon} />
          <input
            type="text"
            placeholder="아이템, 키워드를 검색해보세요"
            className={s.searchInput}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={setFocus}
            autoFocus
          />
          <div className={s.cancel} onClick={reverseSearch}>
            취소
          </div>
        </div>
      ) : (
        <div className={s.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`${s.tab} ${activeSubTab === tab ? s.active : ""}`}
              onClick={() => onSubTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
