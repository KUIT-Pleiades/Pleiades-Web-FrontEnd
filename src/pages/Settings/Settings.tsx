import s from "./settings.module.scss";
import character3face from "../../assets/Character/character3face.png"
import character2face from "../../assets/Character/character2face.png"
import character1face from "../../assets/Character/character1face.png"
import character1body from "../../assets/Character/character1body.png"
import characterBackground from "../../assets/backgroundImg/characterBackground.png";
import resetBtn from "../../assets/btnImg/resetBtn.svg";
import { useState } from "react";

const Settings = () => {
	const [activeMenu, setActiveMenu] = useState("face");
  return (
    <>
      <div className={s.showCharacter}>
        <p className={s.pHeader}>캐릭터 꾸미기</p>
        <button className={s.nextBtn}>다음</button>
        <p className={s.pDescription}>내 캐릭터는 어떤 모습인가요?</p>
        <img
          className={s.characterFace}
          src={character3face}
          alt="캐릭터3얼굴"
        />
        <img className={s.characterBody} src={character1body} alt="캐릭터1몸" />
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
              <div className={s.faceItem}>
                <img src={character3face} alt="" />
              </div>
              <div className={s.faceItem}>
                <img src={character2face} alt="" />
              </div>
              <div className={s.faceItem}>
                <img src={character1face} alt="" />
              </div>
              <div className={s.faceItem}>
                <img src="" alt="" />
              </div>
            </div>
          )}
          {activeMenu === "costume" && <div>의상 선택 영역</div>}
          {activeMenu === "accessory" && <div>악세사리 선택 영역</div>}
        </div>
      </div>
    </>
  );
};

export default Settings;
