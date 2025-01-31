import s from "./LogIn.module.scss";
import pleiadesLogo from "../../assets/pleiadesLogo.png";
import kakao from "../../assets/kakao.svg";
import naver from "../../assets/naver.svg";
import {
  kakaoLogInRedirect,
  naverLogInRedirect,
} from "../../functions/logInRequest";
import { useEffect } from "react";

export default function LogIn() {
  useEffect(() => {}, []);

  const naverLogIn = () => {
    window.location.href = naverLogInRedirect();
  };

  const kakaoLogin = () => {
    kakaoLogInRedirect();
  };

  return (
    <div className={s.logInPageContainer}>
      <div className={s.content}>
        <img
          className={s.logo}
          src={pleiadesLogo}
          width={89.76}
          height={64.58}
          alt="Logo"
        />
        <p className={s.subTitle}>플레이아데스, 내 별, 정거장</p>
        <p className={s.title}>플레이아데스</p>
        <button className={s.button} onClick={kakaoLogin}>
          <img className={s.socialLogo} src={kakao} alt="kakao" />
          <div className={s.buttonDescription}>카카오로 시작하기</div>
        </button>
        <button className={s.button} onClick={naverLogIn}>
          <img className={s.socialLogo} src={naver} alt="naver" />
          <div className={s.buttonDescription}>NAVER로 시작하기</div>
        </button>
      </div>
    </div>
  );
}
