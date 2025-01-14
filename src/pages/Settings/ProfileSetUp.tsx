import s from './profileSetUp.module.scss';
//import profile from '../../mock/character1.json'
import skin01 from "../../assets/Character/face/skin/skin01.png";
import hair01 from "../../assets/Character/face/hair/hair01.png";
import face01 from "../../assets/Character/face/face/face01.png";
import characterBackground from "../../assets/backgroundImg/characterBackground.png";
import { Character } from "../../interfaces/Interfaces";
import React, { useState } from "react";

interface ProfileSetUpProps {
  character: Character;
  onUpdateCharacter: (updates: Partial<Character>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const ProfileSetUp = ({
  character,
  onUpdateCharacter,
  onNext,
  onPrev,
}: ProfileSetUpProps) => {
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateCharacter({ characterName: e.target.value });
  }; // 캐릭터 이름 입력

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateCharacter({ characterId: e.target.value });
  }; // 캐릭터 ID 입력

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateCharacter({ characterAge: +e.target.value }); // 숫자가 아닐경우 에러 발생
  }

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
          <img className={s.characterSkin} src={skin01} alt="skin01" />
          <img className={s.characterface} src={face01} alt="face01" />
          <img className={s.characterhair} src={hair01} alt="hair01" />
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
