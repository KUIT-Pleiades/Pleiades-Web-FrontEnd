import s from "./CharacterSetUp.module.scss";
import character3face from "../../assets/Character/face/character3face.png";
import character1body from "../../assets/Character/body/character1body.png";
import character2body from "../../assets/Character/body/character2body.png";
import character3body from "../../assets/Character/body/character3body.png";
import catEar from "../../assets/Character/accessory/catEar.png";
import glasses from "../../assets/Character/accessory/glasses.png";
import earings from "../../assets/Character/accessory/earings.png";
//import characterBackground from "../../assets/backgroundImg/characterBackground.png";
import resetBtn from "../../assets/btnImg/resetBtn.svg";
import lockImg from "../../assets/lockImg.png";
import { useState } from "react";
import { Character } from "../../interfaces/Interfaces";
import FaceTab from "./FaceTab";
import skin01 from "../../assets/Character/face/skin/skin01.png";
import hair01 from "../../assets/Character/face/hair/hair01.png";
import face01 from "../../assets/Character/face/face/face01.png";


interface CharacterSetUpProps {
  character: Character;
  onUpdateCharacter: (updates: Partial<Character>) => void
  onNext: () => void;
}

const CharacterSetUp = ({ onNext }: CharacterSetUpProps) => {
  const [activeMenu, setActiveMenu] = useState("face");
  const [selectedFace, setSelectedFace] = useState(character3face);
  const [selectedCostume, setSelectedCostume] = useState(character1body);
  const [selectedAccessory, setSelectedAccessory] = useState<string | null>(
    null
  );

  const [skin, setSkin] = useState<string>(skin01); // 레이어 순서: 액세서리>얼굴>머리>상의>하의>신발>피부
  const [face, setFace] = useState<string>(face01);
  const [hair, setHair] = useState<string>(hair01);

  const handleAccessoryClick = (accessory: string) => {
    setSelectedAccessory((prev) => (prev === accessory ? null : accessory));
  };

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
          <img className={s.characterSkin} src={skin} alt="skin01" />
          <img className={s.characterface} src={face} alt="face01" />
          <img className={s.characterhair} src={hair} alt="hair01" />
        </div>
        {selectedAccessory && (
          <img
            className={s.characterAccessory}
            src={selectedAccessory}
            alt=""
          />
        )}
        <img
          className={s.resetBtn}
          src={resetBtn}
          alt="리셋 버튼"
          onClick={() => {
            setSelectedFace(character3face);
            setSelectedCostume(character1body);
            setSelectedAccessory(null);
          }}
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
            얼굴
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
              activeMenu === "accessory" ? s.active : s.inactive
            }`}
            onClick={() => setActiveMenu("accessory")}
          >
            아이템
          </button>
        </div>
        <div className={s.contentArea}>
          {activeMenu === "face" && <FaceTab />}
          {activeMenu === "costume" && (
            <div className={s.gridItems}>
              <div
                className={`${s.item} ${
                  selectedCostume === character1body ? s.selected : ""
                }`}
                onClick={() => setSelectedCostume(character1body)}
              >
                <img src={character1body} alt="캐릭터1몸" />
              </div>
              <div
                className={`${s.item} ${
                  selectedCostume === character2body ? s.selected : ""
                }`}
                onClick={() => setSelectedCostume(character2body)}
              >
                <img src={character2body} alt="캐릭터2몸" />
              </div>
              <div
                className={`${s.item} ${
                  selectedCostume === character3body ? s.selected : ""
                }`}
                onClick={() => setSelectedCostume(character3body)}
              >
                <img src={character3body} alt="캐릭터3몸" />
              </div>
              <div className={s.lockedItem}>
                <img src={lockImg} alt="잠금이미지" />
              </div>
              <div className={s.lockedItem}>
                <img src={lockImg} alt="잠금이미지" />
              </div>
              <div className={s.lockedItem}>
                <img src={lockImg} alt="잠금이미지" />
              </div>
              <div className={s.lockedItem}>
                <img src={lockImg} alt="잠금이미지" />
              </div>
              <div className={s.lockedItem}>
                <img src={lockImg} alt="잠금이미지" />
              </div>
              <div className={s.lockedItem}>
                <img src={lockImg} alt="잠금이미지" />
              </div>
              <div className={s.lockedItem}>
                <img src={lockImg} alt="잠금이미지" />
              </div>
              <div className={s.lockedItem}>
                <img src={lockImg} alt="잠금이미지" />
              </div>
              <div className={s.lockedItem}>
                <img src={lockImg} alt="잠금이미지" />
              </div>
            </div>
          )}
          {activeMenu === "accessory" && (
            <div className={s.gridItems}>
              <div
                className={`${s.item} ${
                  selectedAccessory === catEar ? s.selected : ""
                }`}
                onClick={() => handleAccessoryClick(catEar)}
              >
                <img src={catEar} alt="고양이귀" />
              </div>
              <div
                className={`${s.item} ${
                  selectedAccessory === glasses ? s.selected : ""
                }`}
                onClick={() => handleAccessoryClick(glasses)}
              >
                <img src={glasses} alt="안경" />
              </div>
              <div
                className={`${s.item} ${
                  selectedAccessory === earings ? s.selected : ""
                }`}
                onClick={() => handleAccessoryClick(earings)}
              >
                <img src={earings} alt="귀걸이" />
              </div>
              <div className={s.lockedItem}>
                <img src={lockImg} alt="잠금이미지" />
              </div>
              <div className={s.lockedItem}>
                <img src={lockImg} alt="잠금이미지" />
              </div>
              <div className={s.lockedItem}>
                <img src={lockImg} alt="잠금이미지" />
              </div>
              <div className={s.lockedItem}>
                <img src={lockImg} alt="잠금이미지" />
              </div>
              <div className={s.lockedItem}>
                <img src={lockImg} alt="잠금이미지" />
              </div>
              <div className={s.lockedItem}>
                <img src={lockImg} alt="잠금이미지" />
              </div>
              <div className={s.lockedItem}>
                <img src={lockImg} alt="잠금이미지" />
              </div>
              <div className={s.lockedItem}>
                <img src={lockImg} alt="잠금이미지" />
              </div>
              <div className={s.lockedItem}>
                <img src={lockImg} alt="잠금이미지" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterSetUp;
