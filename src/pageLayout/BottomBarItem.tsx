import s from "./BottomBar.module.scss";
import { Link, useLocation } from "react-router-dom";

interface BottomBarItemProps {
  itemTag: string;
  defaultImg: string;
  selectedImg: string;
  link: string;
}

export default function BottomBarItem({
  itemTag,
  defaultImg,
  selectedImg,
  link,
}: BottomBarItemProps) {
  const location = useLocation();
  const isSelected = location.pathname == link;

  return (
    <Link className={s.barItem} to={link}>
      {isSelected ? (
        <img className={s.icon} src={selectedImg} alt=" " />
      ) : (
        <img className={s.icon} src={defaultImg} alt=" " />
      )}
      <p className={s.itemTag}>{itemTag}</p>
    </Link>
  );
}
