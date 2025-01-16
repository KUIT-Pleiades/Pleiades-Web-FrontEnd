import s from "./backgroundSetUp.module.scss";
import background_Field from "../../assets/backgroundImg/Background_Field.png"
import { useCharacterStore } from "../../store/useCharacterStore";

interface BackgroundSetUpProps {
  onNext: () => void;
  onPrev: () => void;
}

const BackgroundSetUp = ({
  onNext,
  onPrev,
}: BackgroundSetUpProps) => {

  const backgroundStyle = {
    backgroundImage: `url(${background_Field})`,
  };

  const { character } = useCharacterStore();

  return (
    <div style={backgroundStyle} className={s.background}>
      <div className={s.showCharacter}>
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
            src={character.face.skinColor.imgurl}
            alt="skin"
          />
          <img
            className={s.characterface}
            src={character.face.expression.imgurl}
            alt="face"
          />
          <img
            className={s.characterhair}
            src={character.face.hair.imgurl}
            alt="hair"
          />
          <img
            className={s.characterTop}
            src={character.outfit.top.imgurl}
            alt="top"
          />
          <img
            className={s.characterBottom}
            src={character.outfit.bottom.imgurl}
            alt="bottom"
          />
          <img
            className={s.characterShoes}
            src={character.outfit.shoes.imgurl}
            alt="shoes"
          />
        </div>
      </div>
      <div className={s.backgroundList}></div>
    </div>
  );
};

export default BackgroundSetUp;
