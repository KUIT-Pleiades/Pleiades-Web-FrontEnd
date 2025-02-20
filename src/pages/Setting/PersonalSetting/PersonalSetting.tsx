import React from "react";
import s from "./PersonalSetting.module.scss";
import goBtn from "../../../assets/btnImg/goBtn.png";

const PersonalSetting: React.FC = () => {
  return (
    <div className={s.settingContainer}>
      <div className={s.title}>설정</div>

      <div className={s.menuList}>
        <div className={s.menuItem}>
          <span>프로필</span>
          <img src={goBtn} alt="" />
        </div>

        <div className={s.menuItem}>
          <span>로그인 계정</span>
          <span className={s.accountEmail}>play123@naver.com</span>
          <img src={goBtn} alt="" />
        </div>

        <div className={s.serviceInfo}>
          <span>서비스 정보</span>
        </div>

        <div className={s.infoItem}>
          <span>이용약관</span>
          <img src={goBtn} alt="" />
        </div>

        <div className={s.infoItem}>
          <span>개인정보 처리방침</span>
          <img src={goBtn} alt="" />
        </div>
      </div>

      <div className={s.bottomButtons}>
				<button className={s.logoutBtn}>로그아웃</button>
				<span>|</span>
        <button className={s.withdrawBtn}>탈퇴하기</button>
      </div>
    </div>
  );
};

export default PersonalSetting;
