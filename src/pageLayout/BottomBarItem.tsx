import s from "./BottomBar.module.scss";
import { Link, useLocation } from "react-router-dom";

interface BottomBarItemProps {
  itemTag: string;
  defaultImg: string;
  selectedImg: string;
  link: string;
  isDarkMode: boolean;
}

export default function BottomBarItem({
  itemTag,
  defaultImg,
  selectedImg,
  link,
  isDarkMode,
}: BottomBarItemProps) {
  const location = useLocation();
  const isSelected = location.pathname.includes(link);

  return (
    <Link className={s.barItem} to={link}>
      {isSelected ? (
        <img className={`${s.icon} ${isDarkMode ? s.iconDark : s.iconLight}`} src={selectedImg} alt=" " />
      ) : (
        <img className={`${s.icon} ${isDarkMode ? s.iconDark : s.iconLight}`} src={defaultImg} alt=" " />
      )}
      <p className={`${s.itemTag} ${isDarkMode ? s.itemTagDark : s.itemTagLight}`}>{itemTag}</p>
    </Link>
  );
}
