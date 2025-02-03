import s from "./backgroundSetUp.module.scss";
import { useCharacterStore } from "../../store/useCharacterStore";

import { useState } from "react";
import BackgroundTab from "./BackgroundTab";

interface BackgroundSetUpProps {
  onNext: () => void;
  onPrev: () => void;
}

const IMG_BASE_URL: string = import.meta.env.VITE_PINATA_ENDPOINT;

const BackgroundSetUp = ({
  onNext,
  onPrev,
}: BackgroundSetUpProps) => {

  const { character } = useCharacterStore();

  const backgroundStyle = {
    backgroundImage: `url(${IMG_BASE_URL}${character.backgroundName}.png)`,
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
            src={`${IMG_BASE_URL}${character.face.skinColor}.png`}
            alt="skin"
          />
          <img
            className={s.characterFace}
            src={`${IMG_BASE_URL}${character.face.expression}.png`}
            alt="face"
          />
          <img
            className={s.characterHair}
            src={`${IMG_BASE_URL}${character.face.hair}.png`}
            alt="hair"
          />
          <img
            className={s.characterTop}
            src={`${IMG_BASE_URL}${character.outfit.top}.png`}
            alt="top"
          />
          <img
            className={s.characterBottom}
            src={`${IMG_BASE_URL}${character.outfit.bottom}.png`}
            alt="bottom"
          />
          <img
            className={s.characterShoes}
            src={`${IMG_BASE_URL}${character.outfit.shoes}.png`}
            alt="shoes"
          />
          {character.item.head && (
            <img
              className={s.characterItem}
              src={`${IMG_BASE_URL}${character.item.head}.png`}
              alt="headItem"
            />
          )}
          {character.item.eyes && (
            <img
              className={s.characterItem}
              src={`${IMG_BASE_URL}${character.item.eyes}.png`}
              alt="faceItem"
            />
          )}
          {character.item.ears && (
            <img
              className={s.characterItem}
              src={`${IMG_BASE_URL}${character.item.ears}.png`}
              alt="earItem"
            />
          )}
          {character.item.neck && (
            <img
              className={s.characterItem}
              src={`${IMG_BASE_URL}${character.item.neck}.png`}
              alt="neckItem"
            />
          )}
          {character.item.leftWrist && (
            <img
              className={s.characterItem}
              src={`${IMG_BASE_URL}${character.item.leftWrist}.png`}
              alt="handItem"
            />
          )}
          {character.item.rightWrist && (
            <img
              className={s.characterItem}
              src={`${IMG_BASE_URL}${character.item.rightWrist}.png`}
              alt="handItem"
            />
          )}
          {character.item.leftHand && (
            <img
              className={s.characterItem}
              src={`${IMG_BASE_URL}${character.item.leftHand}.png`}
              alt="handItem"
            />
          )}
          {character.item.rightHand && (
            <img
              className={s.characterItem}
              src={`${IMG_BASE_URL}${character.item.rightHand}.png`}
              alt="handItem"
            />
          )}
        </div>
      </div>
      <div
        className={s.backgroundList}
        onClick={() => setShowList(true)}
        style={{
          transition: "transform 0.3s ease-in-out",
          transform: showList ? "translateY(0)" : "translateY(90%)",
          overflow: "hidden",
        }}
      >
        <div className={s.bottomBar}>
          <div className={s.bar}></div>
        </div>
        {showList && <BackgroundTab />}
      </div>
    </div>
  );
};

export default BackgroundSetUp;
