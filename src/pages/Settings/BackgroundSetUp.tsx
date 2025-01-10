import s from "./backgroundSetUp.module.scss";
//import profile from '../../mock/character1.json'
import character1face from "../../assets/Character/face/character1face.png";
import character1body from "../../assets/Character/body/character1body.png";
import catEar from "../../assets/Character/accessory/catEar.png";
import { Character } from "../../interfaces/Interfaces";
//import React, { useState } from "react";

interface BackgroundSetUpProps {
  character: Character;
  onUpdateCharacter: (updates: Partial<Character>) => void;
  onNext: () => void;
  onPrev: () => void;
}
//character: Character;
//onUpdateCharacter: (updates: Partial<Character>) => void;

//character, onUpdateCharacter ,
const BackgroundSetUp = ({
  character,
  onUpdateCharacter,
  onNext,
  onPrev,
}: BackgroundSetUpProps) => {
  return (
    <>
      <div className={s.showCharacter}>
        <button className={s.previousBtn} onClick={onPrev}>
          이전
        </button>
        <p className={s.pHeader}>별 배경 선택하기</p>
        <button className={s.nextBtn} onClick={onNext}>
          완료
        </button>
        <p className={s.pDescription}>내 캐릭터에 어울리는 배경을 골라보세요!</p>
        <img
          className={s.characterFace}
          src={character1face}
          alt="캐릭터3얼굴"
        />
        <img className={s.characterBody} src={character1body} alt="캐릭터1몸" />
        <img className={s.characterAccessory} src={catEar} alt="" />
      </div>
    </>
  );
};

export default BackgroundSetUp;
