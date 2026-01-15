import s from "./BottomBar.module.scss";
import { Link, useLocation } from "react-router-dom";
import { trackEvent } from "../utils/analytics";

interface BottomBarItemProps {
  itemTag: string;
  defaultImg: string;
  selectedImg: string;
  darkModeImg: string;
  link: string;
  isDarkMode: boolean;
}

export default function BottomBarItem({
  itemTag,
  defaultImg,
  selectedImg,
  darkModeImg,
  link,
  isDarkMode,
}: BottomBarItemProps) {
  const location = useLocation();
  const isSelected = location.pathname.includes(link);

  const handleNavClick = () => {
    trackEvent("Navigation", "click_bottom_tab", { tab_name: itemTag });
  };

  return (
    <Link 
      className={s.barItem} 
      to={link}
      onClick={handleNavClick} // [추가] 클릭 시 GA 이벤트 실행
    >
      {isSelected ? (
        <img className={s.icon} src={isDarkMode ? darkModeImg : selectedImg} alt=" " />
      ) : (
        <img className={s.icon} src={isDarkMode ? darkModeImg : defaultImg} alt=" " />
      )}
      <p className={`${s.itemTag} ${isDarkMode ? s.itemTagDark : s.itemTagLight}`}>{itemTag}</p>
    </Link>
  );
}
