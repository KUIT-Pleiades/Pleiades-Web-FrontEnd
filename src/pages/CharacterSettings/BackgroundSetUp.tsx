// src/pages/CharacterSettings/BackgroundSetUp.tsx
import s from "./backgroundSetUp.module.scss";
import { useCharacterStore } from "../../store/useCharacterStore";
import openBtn from "../../assets/btnImg/openBtn.png";

import { useState } from "react";
import BackgroundTab from "./BackgroundTab";
import Pending from "../PageManagement/Pending";
import { useNavigate, useLocation } from "react-router-dom";
import { useGenerateCharacterImageMutation } from "./hooks/useGenerateCharacterImageMutation";
import { useSignupMutation } from "./hooks/useSignupMutation";
import { UserInfo } from "../../interfaces/Interfaces";

interface BackgroundSetUpProps {
  onPrev: () => void;
}

const BackgroundSetUp = ({ onPrev }: BackgroundSetUpProps) => {
  const IMG_BASE_URL: string = import.meta.env.VITE_PINATA_ENDPOINT;
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo, updateUserInfo } = useCharacterStore();
  const [loadingState, setLoadingState] = useState(false);
  const [showList, setShowList] = useState(true);

  const handleLoadingState = () => {
    setLoadingState(true);
  };

  const generateImageMutation = useGenerateCharacterImageMutation();
  const signupMutation = useSignupMutation(location.pathname.includes("onboarding"));

  const backgroundStyle = {
    backgroundImage: `url(${IMG_BASE_URL}${userInfo.starBackground}.png)`,
    overflow: "hidden",
  };

  const complete = async () => {
  setLoadingState(false);

  try {
    const characterImg = await generateImageMutation.mutateAsync(userInfo);

    const signupData: UserInfo = {
      ...userInfo,
      profile: characterImg.profile,
      character: characterImg.character,
    };

    const response = await signupMutation.mutateAsync(signupData);

    if (response.message === "duplicate user") {
      console.log("회원가입 실패: 중복된 사용자");
      navigate("/login");
    } else {
      console.log("회원가입 성공");
      updateUserInfo(signupData);
      navigate("/home");
    }
  } catch (error) {
    console.error("회원가입 또는 이미지 생성 실패", error);
    navigate("/loginfail");
  }
};

  return (
    <div style={backgroundStyle} className={s.background}>
      <div className={s.dim} />
      {!loadingState && <Pending />}
      <div className={s.showCharacter} onClick={() => setShowList(false)}>
        <button className={s.previousBtn} onClick={onPrev}>
          이전
        </button>
        <p className={s.pHeader}>별 배경 선택하기</p>
        <button className={s.nextBtn} onClick={complete}>
          완료
        </button>
        <p className={s.pDescription}>내 캐릭터에 어울리는 배경을 골라보세요!</p>
        <div className={s.characterContainer}>
          <img className={s.characterSkin} src={`${IMG_BASE_URL}${userInfo.face.skinColor}.png`} alt="skin" />
          <img className={s.characterFace} src={`${IMG_BASE_URL}${userInfo.face.expression}.png`} alt="face" />
          <img className={s.characterHair} src={`${IMG_BASE_URL}${userInfo.face.hair}.png`} alt="hair" />
          <img className={s.characterTop} src={`${IMG_BASE_URL}${userInfo.outfit.top}.png`} alt="top" />
          <img className={s.characterBottom} src={`${IMG_BASE_URL}${userInfo.outfit.bottom}.png`} alt="bottom" />
          <img className={s.characterShoes} src={`${IMG_BASE_URL}${userInfo.outfit.shoes}.png`} alt="shoes" />
          {Object.entries(userInfo.item).map(([key, value]) =>
            value ? (
              <img
                key={key}
                className={s.characterItem}
                src={`${IMG_BASE_URL}${value}.png`}
                alt={`${key}Item`}
              />
            ) : null
          )}
        </div>
      </div>
      <div
        className={s.backgroundList}
        style={{
          transition: "transform 0.3s ease-in-out",
          transform: showList ? "translateY(0)" : "translateY(100%)",
          overflow: "hidden",
        }}
      >
        {showList && <BackgroundTab increaseLoadCount={handleLoadingState} />}
      </div>
      {!showList && (
        <div className={s.bottomBar}>
          <div className={s.openBtn} onClick={() => setShowList(true)}>
            <img src={openBtn} alt="" style={{ width: "14px", marginTop: "9px" }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BackgroundSetUp;