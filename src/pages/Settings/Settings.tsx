import s from "./settings.module.scss";
import character3face from "../../assets/Character/face/character3face.png";
import character2face from "../../assets/Character/face/character2face.png";
import character1face from "../../assets/Character/face/character1face.png";
import character1body from "../../assets/Character/body/character1body.png";
import character2body from "../../assets/Character/body/character2body.png";
import character3body from "../../assets/Character/body/character3body.png";
import catEar from "../../assets/Character/accessory/catEar.png";
import glasses from "../../assets/Character/accessory/glasses.png";
import earings from "../../assets/Character/accessory/earings.png";
import characterBackground from "../../assets/backgroundImg/characterBackground.png";
import resetBtn from "../../assets/btnImg/resetBtn.svg";
import lockImg from "../../assets/lockImg.png";
import { useState } from "react";

const Settings = () => {
  const [activeMenu, setActiveMenu] = useState("face");
  const [selectedFace, setSelectedFace] = useState(character3face);
  const [selecttedCostume, setSelectedCostume] = useState(character1body);
  const [selectedAccessory, setSelectedAccessory] = useState<string | null>(
    null
  );
  const handleAccessoryClick = (accessory : string) => {
    setSelectedAccessory((prev) => (prev === accessory ? null : accessory));
  };



  return (
    <>
      <div className={s.showCharacter}>
        <p className={s.pHeader}>캐릭터 꾸미기</p>
        <button className={s.nextBtn}>다음</button>
        <p className={s.pDescription}>내 캐릭터는 어떤 모습인가요?</p>
        <img className={s.characterFace} src={selectedFace} alt="캐릭터3얼굴" />
        <img
          className={s.characterBody}
          src={selecttedCostume}
          alt="캐릭터1몸"
        />
        {selectedAccessory && (
          <img
            className={s.characterAccessory}
            src={selectedAccessory}
            alt=""
          />
        )}
        <img
          className={s.characterBackground}
          src={characterBackground}
          alt="캐릭터후광"
        />
        <img className={s.resetBtn} src={resetBtn} alt="" />
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
            악세사리
          </button>
        </div>
        <div className={s.contentArea}>
          {activeMenu === "face" && (
            <div className={s.faceGrid}>
              <div
                className={s.faceItem}
                onClick={() => setSelectedFace(character3face)}
              >
                <img src={character3face} alt="캐릭터3얼굴" />
              </div>
              <div
                className={s.faceItem}
                onClick={() => setSelectedFace(character2face)}
              >
                <img src={character2face} alt="캐릭터2얼굴" />
              </div>
              <div
                className={s.faceItem}
                onClick={() => setSelectedFace(character1face)}
              >
                <img src={character1face} alt="캐릭터1얼굴" />
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
          {activeMenu === "costume" && (
            <div className={s.costumeGrid}>
              <div
                className={s.costumeItem}
                onClick={() => setSelectedCostume(character1body)}
              >
                <img src={character1body} alt="캐릭터1몸" />
              </div>
              <div
                className={s.costumeItem}
                onClick={() => setSelectedCostume(character2body)}
              >
                <img src={character2body} alt="캐릭터2몸" />
              </div>
              <div
                className={s.costumeItem}
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
            <div className={s.costumeGrid}>
              <div
                className={s.costumeItem}
                onClick={() => handleAccessoryClick(catEar)}
              >
                <img src={catEar} alt="고양이귀" />
              </div>
              <div
                className={s.costumeItem}
                onClick={() => handleAccessoryClick(glasses)}
              >
                <img src={glasses} alt="안경" />
              </div>
              <div
                className={s.costumeItem}
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
    </>
  );
};

export default Settings;
