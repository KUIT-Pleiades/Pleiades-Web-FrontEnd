import s from "./backgroundSetUp.module.scss";
//import profile from '../../mock/character1.json'
import skin01 from "../../assets/Character/face/skin/skin01.png";
import hair01 from "../../assets/Character/face/hair/hair01.png";
import face01 from "../../assets/Character/face/face/face01.png";
//import { Character } from "../../interfaces/Interfaces";
//import React, { useState } from "react";
import background_Field from "../../assets/backgroundImg/Background_Field.png"

interface BackgroundSetUpProps {
  onNext: () => void;
  onPrev: () => void;
}
//character: Character;
//onUpdateCharacter: (updates: Partial<Character>) => void;

//character, onUpdateCharacter ,
const BackgroundSetUp = ({
  //character,
  //onUpdateCharacter,
  onNext,
  onPrev,
}: BackgroundSetUpProps) => {

  const backgroundStyle = {
    backgroundImage: `url(${background_Field})`,
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
          <img className={s.characterSkin} src={skin01} alt="skin01" />
          <img className={s.characterface} src={face01} alt="face01" />
          <img className={s.characterhair} src={hair01} alt="hair01" />
        </div>
      </div>
      <div className={s.backgroundList}></div>
    </div>
  );
};

export default BackgroundSetUp;
