import s from "./Pending.module.scss";
import pleiadesLogo from "../../assets/pleiadesLogo.png";

export default function Pending() {
  return (
    <div className={s.dim}>
      <img
        className={s.logo}
        src={pleiadesLogo}
        alt="logo"
        width={125.53}
        height={90.32}
      />
      <p className={s.subTitle}>화면을 불러오는 중이에요!</p>
      <h3 className={s.title}>잠시만 기다려주세요</h3>
    </div>
  );
}
