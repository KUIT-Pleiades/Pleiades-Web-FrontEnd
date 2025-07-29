import s from "./Splash.module.scss";
import backGroundImg1 from "../../assets/splashBackGround1.svg";
import backGroundImg2 from "../../assets/splashBackGround2.svg";
import backGroundImg3 from "../../assets/splashBackGround3.svg";
import backGroundImg4 from "../../assets/splashBackGround4.svg";
import { lazy, Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showText, setShowText] = useState(false);

  // 실제 필요한 정보 로딩 함수 (예시: 1초 후 로딩 완료)
  const loadAllData = async () => {
    // 여기에 실제 데이터/이미지/폰트 등 로딩 로직 추가
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  useEffect(() => {
    loadAllData().then(() => setIsLoaded(true));
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    // 텍스트 페이드인 트리거
    const textTimer = setTimeout(() => setShowText(true), 100);
    // 로그인 이동 타이머
    const timer = setTimeout(() => {
      navigate("/login");
    }, 1500);
    return () => {
      clearTimeout(timer);
      clearTimeout(textTimer);
    };
  }, [isLoaded, navigate]);

  const Logo = lazy(() => import("./Logo"));

  return (
    <div className={s.splashContainer}>
      <img className={s.backGround1} src={backGroundImg1} alt=" " />
      <img className={s.backGround2} src={backGroundImg2} alt="  " />
      <img className={s.backGround3} src={backGroundImg3} alt="  " />
      <img className={s.backGround4} src={backGroundImg4} alt="  " />
      {/* 로딩이 끝나기 전에는 배경만 보여줌 */}
      {isLoaded && (
        <div className={s.content}>
          <div className={s.motionSection}>
            <Suspense fallback={""}>
              <Logo />
            </Suspense>
          </div>
          {showText && <p className={s.subTitle}>별과 우주정거장이 모이는 곳,</p>}
          {showText && <p className={s.title}>플레이아데스</p>}
        </div>
      )}
    </div>
  );
}
