import { NavLink } from "react-router-dom";
import s from "./MarketBar.module.scss";

export default function MarketBar() {
  return (
    <div className={s.marketBarContainer}>
      <div className={s.leftLinks}>
        <NavLink
          to="."
          end
          className={({ isActive }) => (isActive ? s.active : "")}
        >
          공식몰
        </NavLink>
        <NavLink
          to="used"
          className={({ isActive }) => (isActive ? s.active : "")}
        >
          중고몰
        </NavLink>
      </div>
      <div className={s.rightLink}>
        <NavLink
          to="my"
          className={({ isActive }) => (isActive ? s.active : "")}
        >
          MY
        </NavLink>
      </div>
    </div>
  );
}