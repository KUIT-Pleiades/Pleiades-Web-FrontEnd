import s from "./BottomBar.module.scss";
import { Link, useLocation } from "react-router-dom";

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

  return (
    <Link className={s.barItem} to={link}>
      {isSelected ? (
        <img className={s.icon} src={isDarkMode ? darkModeImg : selectedImg} alt=" " />
      ) : (
        <img className={s.icon} src={isDarkMode ? darkModeImg : defaultImg} alt=" " />
      )}
      <p className={`${s.itemTag} ${isDarkMode ? s.itemTagDark : s.itemTagLight}`}>{itemTag}</p>
    </Link>
  );
}
