import s from "./CharacterSetUp.module.scss";
import characterBackground from "../../assets/backgroundImg/characterBackground.png";
import resetBtn from "../../assets/btnImg/resetBtn.svg";
import { useState } from "react";
import FaceTab from "./characterSetUpTab/FaceTab";
import { useCharacterStore } from "../../store/useCharacterStore";
import OutFitTab from "./characterSetUpTab/OutFitTab";
import ItemTab from "./characterSetUpTab/ItemTab";

const IMG_BASE_URL: string = import.meta.env.VITE_PINATA_ENDPOINT;

interface CharacterSetUpProps {
  onNext: () => void;
}

const CharacterSetUp = ({ onNext }: CharacterSetUpProps) => {
  const [activeMenu, setActiveMenu] = useState("face");

  const { character, resetCharacter } = useCharacterStore();

  // 레이어 순서: 액세서리>얼굴>머리>상의>하의>신발>피부

  return (
    <div className={s.characterSetUpContainer}>
      <div className={s.showCharacter}>
        <p className={s.pHeader}>캐릭터 꾸미기</p>
        <button className={s.nextBtn} onClick={onNext}>
          다음
        </button>
        <p className={s.pDescription}>내 캐릭터는 어떤 모습인가요?</p>
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
        <img
          className={s.characterBackground}
          src={characterBackground}
          alt="캐릭터후광"
        />
        <img
          className={s.resetBtn}
          src={resetBtn}
          alt="리셋 버튼"
          onClick={resetCharacter}
        />
      </div>
      <div className={s.setCharacter}>
        <div className={s.menuBar}>
          <button
            className={`${s.menuItem} ${
              activeMenu === "face" ? s.active : s.inactive
            }`}
            onClick={() => setActiveMenu("face")}
          >
            캐릭터
          </button>
          <button
            className={`${s.menuItem} ${
              activeMenu === "costume" ? s.active : s.inactive
            }`}
            onClick={() => setActiveMenu("costume")}
          >
            의상
          </button>
          <button
            className={`${s.menuItem} ${
              activeMenu === "item" ? s.active : s.inactive
            }`}
            onClick={() => setActiveMenu("item")}
          >
            아이템
          </button>
        </div>
        <div className={s.contentArea}>
          {activeMenu === "face" && <FaceTab />}
          {activeMenu === "costume" && <OutFitTab />}
          {activeMenu === "item" && <ItemTab />}
        </div>
      </div>
    </div>
  );
};

export default CharacterSetUp;
