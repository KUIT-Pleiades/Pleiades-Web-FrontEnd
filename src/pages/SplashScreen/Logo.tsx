import pleiadesLogo from "../../assets/pleiadesLogo.png";
import s from "./Splash.module.scss";

interface logoProps {
  width: number;
  height: number;
}

export default function Logo({ width, height }: logoProps) {
  return (
    <img
      className={s.logo}
      src={pleiadesLogo}
      width={width}
      height={height}
      alt="Logo"
    />
  );
}
