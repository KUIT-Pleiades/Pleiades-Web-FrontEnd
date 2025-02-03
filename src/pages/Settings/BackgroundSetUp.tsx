import s from "./backgroundSetUp.module.scss";
import { useCharacterStore } from "../../store/useCharacterStore";

import { useState } from "react";
import BackgroundTab from "./BackgroundTab";

interface BackgroundSetUpProps {
  onNext: () => void;
  onPrev: () => void;
}

const BackgroundSetUp = ({
  onNext,
  onPrev,
}: BackgroundSetUpProps) => {

  const { character } = useCharacterStore();

  const backgroundStyle = {
    backgroundImage: `url(${character.backgroundName})`,
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
            src={character.face.skinColor}
            alt="skin"
          />
          <img
            className={s.characterFace}
            src={character.face.expression}
            alt="face"
          />
          <img
            className={s.characterHair}
            src={character.face.hair}
            alt="hair"
          />
          <img
            className={s.characterTop}
            src={character.outfit.top}
            alt="top"
          />
          <img
            className={s.characterBottom}
            src={character.outfit.bottom}
            alt="bottom"
          />
          <img
            className={s.characterShoes}
            src={character.outfit.shoes}
            alt="shoes"
          />
          {character.item.head && (
            <img
              className={s.characterItem}
              src={character.item.head}
              alt="headItem"
            />
          )}
          {character.item.eyes&& (
            <img
              className={s.characterItem}
              src={character.item.eyes}
              alt="faceItem"
            />
          )}
          {character.item.ears && (
            <img
              className={s.characterItem}
              src={character.item.ears}
              alt="earItem"
            />
          )}
          {character.item.neck && (
            <img
              className={s.characterItem}
              src={character.item.neck}
              alt="neckItem"
            />
          )}
          {character.item.leftWrist && (
            <img
              className={s.characterItem}
              src={character.item.leftWrist}
              alt="handItem"
            />
          )}
          {character.item.rightWrist && (
            <img
              className={s.characterItem}
              src={character.item.rightWrist}
              alt="handItem"
            />
          )}
          {character.item.leftHand && (
            <img
              className={s.characterItem}
              src={character.item.leftHand}
              alt="handItem"
            />
          )}
          {character.item.rightHand && (
            <img
              className={s.characterItem}
              src={character.item.rightHand}
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
