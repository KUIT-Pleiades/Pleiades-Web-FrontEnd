import { useCharacterStore } from "../../../store/useCharacterStore";
import s from "./OfficialStore.module.scss";
import MarketBottomSheet from "./MarketBottomSheet/MarketBottomSheet";
import characterBackground from "../../../assets/backgroundImg/characterBackground.png";
import resetBtn from "../../../assets/btnImg/resetBtn.svg";
import addBagBtn from "../../../assets/btnImg/addBagBtn.svg";
import heartBtn from "../../../assets/btnImg/heartBtn.svg";

export default function OfficialStore() {
  const { userInfo, resetUserInfo } = useCharacterStore();
  const IMG_BASE_URL: string = import.meta.env.VITE_PINATA_ENDPOINT;
  const isWearingSet = !!userInfo.outfit.set;

  return (
    <div className={s.container}>
      <div className={s.characterContainer}>
        <img
          className={s.characterBackground}
          src={characterBackground}
          alt="캐릭터후광"
        />
        <img
          className={s.characterSkin}
          src={`${IMG_BASE_URL}${userInfo.face.skinColor}`}
          alt="skin"
        />
        <img
          className={s.characterEyes}
          src={`${IMG_BASE_URL}${userInfo.face.eyes}`}
          alt="eyes"
        />
        <img
          className={s.characterNose}
          src={`${IMG_BASE_URL}${userInfo.face.nose}`}
          alt="nose"
        />
        <img
          className={s.characterMouth}
          src={`${IMG_BASE_URL}${userInfo.face.mouth}`}
          alt="mouth"
        />
        {userInfo.face.mole && (
          <img
            className={s.characterMole}
            src={`${IMG_BASE_URL}${userInfo.face.mole}`}
            alt="mole"
          />
        )}
        <img
          className={s.characterHair}
          src={`${IMG_BASE_URL}${userInfo.face.hair}`}
          alt="hair"
        />
        {!isWearingSet && (
          <>
            <img
              className={s.characterTop}
              src={`${IMG_BASE_URL}${userInfo.outfit.top}`}
              alt="top"
            />
            <img
              className={s.characterBottom}
              src={`${IMG_BASE_URL}${userInfo.outfit.bottom}`}
              alt="bottom"
            />
          </>
        )}
        {isWearingSet && (
          <img
            className={s.characterSet}
            src={`${IMG_BASE_URL}${userInfo.outfit.set}`}
            alt="set"
          />
        )}
        <img
          className={s.characterShoes}
          src={`${IMG_BASE_URL}${userInfo.outfit.shoes}`}
          alt="shoes"
        />
        {Object.entries(userInfo.item).map(([part, src]) => {
          if (!src) return null;
          return (
            <img
              key={part}
              className={s[part]}
              src={`${IMG_BASE_URL}${src}`}
              alt={part}
            />
          );
        })}
        <div className={s.buttonContainer}>
          <img
            className={s.resetBtn}
            src={resetBtn}
            alt="리셋 버튼"
            onClick={resetUserInfo}
          />
          <img
            className={s.addBagBtn}
            src={addBagBtn}
            alt="장바구니 버튼"
            onClick={() => {}}
          />
          <img
            className={s.heartBtn}
            src={heartBtn}
            alt="좋아요 버튼"
            onClick={() => {}}
          />
        </div>
			</div>
			<MarketBottomSheet />
    </div>
  );
}