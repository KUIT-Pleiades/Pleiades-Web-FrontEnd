import s from './profileSetUp.module.scss';
//import profile from '../../mock/character1.json'
import characterBackground from "../../assets/backgroundImg/characterBackground.png";
import React, { useState } from "react";
import { useCharacterStore } from '../../store/useCharacterStore';

interface ProfileSetUpProps {
  onNext: () => void;
  onPrev: () => void;
}

const ProfileSetUp = ({
  onNext,
  onPrev,
}: ProfileSetUpProps) => {
  
  const { character, updateCharacter } = useCharacterStore();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateCharacter({ characterName: e.target.value });
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateCharacter({ characterId: e.target.value });
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateCharacter({ characterAge: +e.target.value });
  };

  const [idExists, setIdExists] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("중복확인");

  const idCheck = () => {
    setIdExists(!idExists);
    setButtonText(idExists ? "중복확인" : "사용가능"); // 아직 서버와 연결되지 않아서 단순히 디자인만 구현
  };


  return (
    <div className={s.profileSetUpContainer}>
      <div className={s.showCharacter}>
        <button className={s.previousBtn} onClick={onPrev}>
          이전
        </button>
        <p className={s.pHeader}>캐릭터 설정하기</p>
        <button className={s.nextBtn} onClick={onNext}>
          다음
        </button>
        <p className={s.pDescription}>내 캐릭터에 이름과 나이를 지어주세요!</p>
        <div className={s.characterContainer}>
          <img
            className={s.characterSkin}
            src={character.face.skinColor.imgurl}
            alt="skin"
          />
          <img
            className={s.characterFace}
            src={character.face.expression.imgurl}
            alt="expression"
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
        <img
          className={s.characterBackground}
          src={characterBackground}
          alt="캐릭터후광"
        />
      </div>
      <div className={s.inputContainer}>
        <input
          type="text"
          value={character.characterName || ""}
          onChange={handleNameChange}
          placeholder="캐릭터의 이름을 지어주세요"
          className={s.nameInput}
        />
        <div className={s.IdContainer}>
          <div className={s.id}>ID</div>
          <input
            type="text"
            value={character.characterId || ""}
            onChange={handleIdChange}
            placeholder="영문, 숫자 조합 4-10자리"
            className={s.idInput}
          />
          <button
            onClick={idCheck}
            className={`${s.checkBtn} ${idExists ? s.available : ""}`}
          >
            {buttonText}
          </button>
        </div>
        <div className={s.ageContainer}>
          <div className={s.age}>생년월일</div>
          <input
            type="text"
            value={character.characterAge || ""}
            onChange={handleAgeChange}
            placeholder="아직 디자인 중"
            className={s.ageInput}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileSetUp;
