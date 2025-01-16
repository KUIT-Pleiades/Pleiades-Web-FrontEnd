import pleiadesLogo from "../../assets/pleiadesLogo.png";
import s from "./Splash.module.scss";

export default function Logo() {
  return (
    <img
      className={s.logo}
      src={pleiadesLogo}
      width={192.24}
      height={138.32}
      alt="Logo"
    />
  );
}
