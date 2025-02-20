import s from "./LogInPending.module.scss";
import backGroundImg1 from "../../assets/splashBackGround1.svg";
import backGroundImg2 from "../../assets/splashBackGround2.svg";
import backGroundImg3 from "../../assets/splashBackGround3.svg";
import backGroundImg4 from "../../assets/splashBackGround4.svg";
import spaceShip from "../../assets/spaceShip.svg";
import pleiadesLogo from "../../assets/pleiadesLogo.png";

export default function LogInPending() {
  return (
    <div className={s.pageContainer}>
      <img className={s.backGround1} src={backGroundImg1} alt=" " />
      <img className={s.backGround2} src={backGroundImg2} alt=" " />
      <img className={s.backGround3} src={backGroundImg3} alt=" " />
      <img className={s.backGround4} src={backGroundImg4} alt=" " />
      <div className={s.content}>
        <div className={s.motionSection}>
          <img className={s.spaceShip1} src={spaceShip} alt="우주선" />
          <img className={s.spaceShip2} src={spaceShip} alt="우주선" />
          <img src={pleiadesLogo} width={125.53} height={90.32} alt="Logo" />
        </div>
        <p className={s.subTitle}>로그인 중!</p>
        <p className={s.title}>내 별로 비행중이에요</p>
      </div>
    </div>
  );
}
