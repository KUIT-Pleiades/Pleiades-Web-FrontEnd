// src/pages/CharacterSettings/BackgroundSetUp.tsx
import s from "./backgroundSetUp.module.scss";
import { useCharacterStore } from "../../store/useCharacterStore";

import { useState } from "react";
import BackgroundTab from "./BackgroundTab";
import Pending from "../PageManagement/Pending";
import { useNavigate, useLocation } from "react-router-dom";
import { useGenerateCharacterImageMutation } from "./hooks/useGenerateCharacterImageMutation";
import { useSignupMutation } from "./hooks/useSignupMutation";
import { UserInfo } from "../../interfaces/Interfaces";
import { IMG_BASE_URL, getImagePath } from "../../functions/getImage";

interface BackgroundSetUpProps {
  onPrev: () => void;
}

const BackgroundSetUp = ({ onPrev }: BackgroundSetUpProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo, updateUserInfo, updateImgVersion } = useCharacterStore();
  const [loadingState, setLoadingState] = useState(false);
  const [showList, setShowList] = useState(true);

  const isWearingSet = !!userInfo.outfit.set;

  const handleLoadingState = () => {
    setLoadingState(true);
  };

  const generateImageMutation = useGenerateCharacterImageMutation();
  const signupMutation = useSignupMutation(
    location.pathname.includes("onboarding")
  );

  const backgroundStyle = {
    backgroundImage: `url(${IMG_BASE_URL}background/${userInfo.starBackground})`,
    overflow: "hidden",
  };

  const complete = async () => {
    setLoadingState(false); // 로딩 시작 (Pending 컴포넌트 표시)

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
        updateImgVersion();
        navigate("/home");
      }
    } catch (error) {
      console.error("회원가입 또는 이미지 생성 실패", error);
      navigate("/loginfail");
    } finally {
        // 성공하든 실패하든 페이지 이동 전까지는 로딩 유지가 나을 수 있음
        // 에러 시에만 로딩을 꺼야 할 수도 있지만, 
        // navigate로 이동해버리므로 여기서 굳이 true로 바꿀 필요는 없을 수 있음
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
        <p className={s.pDescription}>
          내 캐릭터에 어울리는 배경을 골라보세요!
        </p>
        <div className={s.characterContainer}>
          <img
            className={s.characterSkin}
            src={`${IMG_BASE_URL}${getImagePath(userInfo.face.skinColor)}`}
            alt="skin"
          />
          <img
            className={s.characterEyes}
            src={`${IMG_BASE_URL}${getImagePath(userInfo.face.eyes)}`}
            alt="eyes"
          />
          <img
            className={s.characterNose}
            src={`${IMG_BASE_URL}${getImagePath(userInfo.face.nose)}`}
            alt="nose"
          />
          <img
            className={s.characterMouth}
            src={`${IMG_BASE_URL}${getImagePath(userInfo.face.mouth)}`}
            alt="mouth"
          />
          {userInfo.face.mole && (
            <img
              className={s.characterMole}
              src={`${IMG_BASE_URL}${getImagePath(userInfo.face.mole)}`}
              alt="mole"
            />
          )}
          <img
            className={s.characterHair}
            src={`${IMG_BASE_URL}${getImagePath(userInfo.face.hair)}`}
            alt="hair"
          />
          {!isWearingSet && (
            <>
              <img
                className={s.characterTop}
                src={`${IMG_BASE_URL}${getImagePath(userInfo.outfit.top)}`}
                alt="top"
              />
              <img
                className={s.characterBottom}
                src={`${IMG_BASE_URL}${getImagePath(userInfo.outfit.bottom)}`}
                alt="bottom"
              />
            </>
          )}
          {isWearingSet && (
            <img
              className={s.characterSet}
              src={`${IMG_BASE_URL}${getImagePath(userInfo.outfit.set)}`}
              alt="set"
            />
          )}
          <img
            className={s.characterShoes}
            src={`${IMG_BASE_URL}${getImagePath(userInfo.outfit.shoes)}`}
            alt="shoes"
          />
          {Object.entries(userInfo.item).map(([part, src]) => {
            if (!src) return null;
            return (
              <img
                key={part}
                className={s[part]}
                src={`${IMG_BASE_URL}${getImagePath(src)}`}
                alt={part}
              />
            );
          })}
        </div>
      </div>
      <div
        className={s.backgroundList}
        style={{
          transition: "transform 0.3s ease-in-out",
          transform: showList ? "translateY(0)" : "translateY(85%)",
        }}
      >
        <div className={s.bottomBar} onClick={() => setShowList(true)}>
          <div className={s.bar} />
        </div>

        <BackgroundTab increaseLoadCount={handleLoadingState} />
      </div>
    </div>
  );
};

export default BackgroundSetUp;
