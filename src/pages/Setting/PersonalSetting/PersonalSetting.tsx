import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { axiosRequest } from "../../../functions/axiosRequest";
import s from "./PersonalSetting.module.scss";
import goBtn from "../../../assets/btnImg/goBtn.png";
import { useAuth } from "../../../store/authStore";
import { useCharacterStore } from "../../../store/useCharacterStore";

interface UserData {
  userId: string;
  userName: string;
  birthDate: string;
  email: string;
  profile: string;
}

const PersonalSetting: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const { clearToken } = useAuth();
  const { resetUserInfo } = useCharacterStore();

  const handleLogout = async () => {
  try {
    await axiosRequest("/auth/logout", "POST", null);
    
		// 200 OK든 404든 상관없이 클라이언트 토큰 제거
		resetUserInfo();
    clearToken();
    navigate("/login");
    
  } catch (error) {
    console.error("로그아웃 요청 실패:", error);
    
    // 404 "User not found" 에러라도 로그아웃 처리
		if (axios.isAxiosError(error) && error.response?.status === 404) {
      console.log("사용자를 찾을 수 없지만 로그아웃 처리합니다.");
    }
    
    // 어떤 에러든 클라이언트 상태는 초기화
    clearToken();
    navigate("/login");
  }
};

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axiosRequest<UserData>(
          "/home/settings/profile",
          "GET",
          null
        );

        if (response) {
          setUserData(response.data);
        }
      } catch (error) {
        console.error("사용자 데이터 가져오기 실패:", error);
      }
    };

    getUserData();
  }, []);

  const handleProfileClick = () => {
    navigate("/setting/profile");
  };

  return (
    <div className={s.settingContainer}>
      <div className={s.title}>설정</div>

      <div className={s.menuList}>
        <div className={s.menuItem} onClick={handleProfileClick}>
          <span>프로필</span>
          <img src={goBtn} alt="" />
        </div>

        <div className={s.menuItem}>
          <span>로그인 계정</span>
          <span className={s.accountEmail}>{userData?.email}</span>
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
        <button className={s.logoutBtn} onClick={handleLogout}>
          로그아웃
        </button>
        <span>|</span>
        <button className={s.withdrawBtn}>탈퇴하기</button>
      </div>
    </div>
  );
};

export default PersonalSetting;
