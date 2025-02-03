import s from "./CharacterSetUp.module.scss";
import characterBackground from "../../assets/backgroundImg/characterBackground.png";
import resetBtn from "../../assets/btnImg/resetBtn.svg";
import { useState } from "react";
import FaceTab from "./characterSetUpTab/FaceTab";
import { useCharacterStore } from "../../store/useCharacterStore";
import OutFitTab from "./characterSetUpTab/OutFitTab";
import ItemTab from "./characterSetUpTab/ItemTab";

interface CharacterSetUpProps {
  onNext: () => void;
}

const CharacterSetUp = ({ onNext }: CharacterSetUpProps) => {
  const [activeMenu, setActiveMenu] = useState("face");

  const { character, resetCharacter } = useCharacterStore();

  // 레이어 순서: 액세서리>얼굴>머리>상의>하의>신발>피부

  //  서버에서 받아온 데이터로 캐릭터 설정하도록 바꿔야함
  // 다음 버튼 클릭 시, 다음 페이지로 이동, 현재 상태를 저장

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
          {character.item.eyes && (
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
