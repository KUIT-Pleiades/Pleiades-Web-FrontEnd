import s from "./backgroundSetUp.module.scss";
import { useCharacterStore } from "../../store/useCharacterStore";
import openBtn from "../../assets/btnImg/openBtn.png"

import { useState } from "react";
import BackgroundTab from "./BackgroundTab";

interface BackgroundSetUpProps {
  onNext: () => void;
  onPrev: () => void;
}

const IMG_BASE_URL: string = import.meta.env.VITE_PINATA_ENDPOINT;

const BackgroundSetUp = ({ onNext, onPrev }: BackgroundSetUpProps) => {
  const { userInfo } = useCharacterStore();

  const backgroundStyle = {
    backgroundImage: `url(${IMG_BASE_URL}${userInfo.starBackground}.png)`,
    overflow: "hidden",
  };

  const [showList, setShowList] = useState(true);

  return (
    <div style={backgroundStyle} className={s.background}>
      <div className={s.showCharacter} onClick={() => setShowList(false)}>
        <button className={s.previousBtn} onClick={onPrev}>
          이전
        </button>
        <p className={s.pHeader}>별 배경 선택하기</p>
        <button className={s.nextBtn} onClick={onNext}>
          완료
        </button>
        <p className={s.pDescription}>
          내 캐릭터에 어울리는 배경을 골라보세요!
        </p>
        <div className={s.characterContainer}>
          <img
            className={s.characterSkin}
            src={`${IMG_BASE_URL}${userInfo.face.skinColor}.png`}
            alt="skin"
          />
          <img
            className={s.characterFace}
            src={`${IMG_BASE_URL}${userInfo.face.expression}.png`}
            alt="face"
          />
          <img
            className={s.characterHair}
            src={`${IMG_BASE_URL}${userInfo.face.hair}.png`}
            alt="hair"
          />
          <img
            className={s.characterTop}
            src={`${IMG_BASE_URL}${userInfo.outfit.top}.png`}
            alt="top"
          />
          <img
            className={s.characterBottom}
            src={`${IMG_BASE_URL}${userInfo.outfit.bottom}.png`}
            alt="bottom"
          />
          <img
            className={s.characterShoes}
            src={`${IMG_BASE_URL}${userInfo.outfit.shoes}.png`}
            alt="shoes"
          />
          {userInfo.item.head && (
            <img
              className={s.characterItem}
              src={`${IMG_BASE_URL}${userInfo.item.head}.png`}
              alt="headItem"
            />
          )}
          {userInfo.item.eyes && (
            <img
              className={s.characterItem}
              src={`${IMG_BASE_URL}${userInfo.item.eyes}.png`}
              alt="faceItem"
            />
          )}
          {userInfo.item.ears && (
            <img
              className={s.characterItem}
              src={`${IMG_BASE_URL}${userInfo.item.ears}.png`}
              alt="earItem"
            />
          )}
          {userInfo.item.neck && (
            <img
              className={s.characterItem}
              src={`${IMG_BASE_URL}${userInfo.item.neck}.png`}
              alt="neckItem"
            />
          )}
          {userInfo.item.leftWrist && (
            <img
              className={s.characterItem}
              src={`${IMG_BASE_URL}${userInfo.item.leftWrist}.png`}
              alt="handItem"
            />
          )}
          {userInfo.item.rightWrist && (
            <img
              className={s.characterItem}
              src={`${IMG_BASE_URL}${userInfo.item.rightWrist}.png`}
              alt="handItem"
            />
          )}
          {userInfo.item.leftHand && (
            <img
              className={s.characterItem}
              src={`${IMG_BASE_URL}${userInfo.item.leftHand}.png`}
              alt="handItem"
            />
          )}
          {userInfo.item.rightHand && (
            <img
              className={s.characterItem}
              src={`${IMG_BASE_URL}${userInfo.item.rightHand}.png`}
              alt="handItem"
            />
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
        {showList && <BackgroundTab />}
      </div>
      {!showList && (
        <div className={s.bottomBar}>
          <div className={s.openBtn} onClick={() => setShowList(true)}>
            <img src={openBtn} alt="" style={{width: "14px", marginTop:"9px"}} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BackgroundSetUp;
