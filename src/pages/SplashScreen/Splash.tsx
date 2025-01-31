import s from "./Splash.module.scss";
import backGroundImg1 from "../../assets/splashBackGround1.svg";
import backGroundImg2 from "../../assets/splashBackGround2.svg";
import backGroundImg3 from "../../assets/splashBackGround3.svg";
import backGroundImg4 from "../../assets/splashBackGround4.svg";
import { lazy, Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  const Logo = lazy(() => import("./Logo"));

  return (
    <div className={s.splashContainer}>
      <img className={s.backGround1} src={backGroundImg1} alt=" " />
      <img className={s.backGround2} src={backGroundImg2} alt="  " />
      <img className={s.backGround3} src={backGroundImg3} alt="  " />
      <img className={s.backGround4} src={backGroundImg4} alt="  " />
      <div className={s.content}>
        <div className={s.motionSection}>
          <Suspense fallback={""}>
            <Logo />
          </Suspense>
        </div>
        <p className={s.subTitle}>별과 우주정거장이 모이는 곳,</p>
        <p className={s.title}>플레이아데스</p>
      </div>
    </div>
  );
}
