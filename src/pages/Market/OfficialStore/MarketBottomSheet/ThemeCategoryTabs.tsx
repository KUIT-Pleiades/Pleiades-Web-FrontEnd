import s from "./ThemeCategoryTabs.module.scss";
import heartIcon from "../../../../assets/Icon/heart.svg";
import filledHeartIcon from "../../../../assets/Icon/filledHeart.svg";
import searchBtn from "../../../../assets/btnImg/blackSearchBtn.svg";
import { useThemes } from "../../../../hooks/queries/useThemes";
import { CategoryType } from "../OfficialUsedStore";
//import closeBtn from "../../../../assets/btnImg/closeBtn.svg";

interface ThemeCategoryTabsProps {
  reverseSearch: () => void;
  activeTheme: string;
  onThemeChange: (theme: string) => void;
  isFocus: boolean; // isFocus prop 추가
  setFocus: () => void; // setFocus prop 추가
  activeCategory: CategoryType; // 카테고리 추가
}

export default function ThemeCategoryTabs({
  reverseSearch,
  activeTheme,
  onThemeChange,
  isFocus,
  activeCategory,
}: ThemeCategoryTabsProps) {
  const { data: themeData, isLoading } = useThemes();

  // 카테고리별 테마 가져오기 (기본값은 빈 배열)
  const getThemesForCategory = (): string[] => {
    if (!themeData) return [];

    switch (activeCategory) {
      case "face":
        return themeData.face || [];
      case "cloth":
        return themeData.fashion || [];
      case "background":
        return themeData.background || [];
      default:
        return [];
    }
  };

  const categoryThemes = getThemesForCategory();

  // "좋아요"와 "추천"을 서버 테마 앞에 추가
  const THEME_CATEGORIES = ["좋아요", "추천", ...categoryThemes];

  if (isLoading) {
    return (
      <div className={s.container}>
        <div className={s.themeContainer}>
          <div>테마 로딩 중...</div>
        </div>
      </div>
    );
  }

  return (
    !isFocus && (
      <div className={s.container}>
        <div className={s.themeContainer}>
          {THEME_CATEGORIES.map((theme) => (
            <button
              key={theme}
              className={`${s.themeTab} ${
                activeTheme === theme ? s.active : ""
              }`}
              onClick={() => onThemeChange(theme)}
            >
              {theme === "좋아요" ? (
                <img
                  className={s.themeIcon}
                  src={activeTheme === "좋아요" ? filledHeartIcon : heartIcon}
                  alt="좋아요"
                />
              ) : (
                theme
              )}
            </button>
          ))}
        </div>
        <button className={s.searchButton} onClick={reverseSearch}>
          <img src={searchBtn} alt="search" />
        </button>
      </div>
    )
  );
}
