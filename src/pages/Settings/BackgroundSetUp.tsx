import s from "./backgroundSetUp.module.scss";
import { useCharacterStore } from "../../store/useCharacterStore";
import BackgroundTab from "./BackgroundTab/BackgroundTab";

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
    backgroundImage: `url(${character.background.imgurl})`,
  };


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
            className={s.characterFace}
            src={character.face.expression.imgurl}
            alt="face"
          />
          <img
            className={s.characterHair}
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
          {character.item.head.imgurl && (
            <img
              className={s.characterItem}
              src={character.item.head.imgurl}
              alt="headItem"
            />
          )}
          {character.item.face.imgurl && (
            <img
              className={s.characterItem}
              src={character.item.face.imgurl}
              alt="faceItem"
            />
          )}
          {character.item.ear.imgurl && (
            <img
              className={s.characterItem}
              src={character.item.ear.imgurl}
              alt="earItem"
            />
          )}
          {character.item.neck.imgurl && (
            <img
              className={s.characterItem}
              src={character.item.neck.imgurl}
              alt="neckItem"
            />
          )}
          {character.item.hand.name && (
            <img
              className={s.characterItem}
              src={character.item.hand.imgurl}
              alt="handItem"
            />
          )}
        </div>
      </div>
      <div className={s.backgroundList}>
        <BackgroundTab />
      </div>
    </div>
  );
};

export default BackgroundSetUp;
