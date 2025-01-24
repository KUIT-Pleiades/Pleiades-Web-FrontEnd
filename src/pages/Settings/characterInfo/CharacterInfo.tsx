import React from "react";
import { useCharacterStore } from "../../../store/useCharacterStore";
import { Character } from "../../../interfaces/Interfaces";


const CharacterDisplay: React.FC = () => {
  // Zustand store에서 character 상태 가져오기
  const character: Character = useCharacterStore((state) => state.character);

  return (
    <div className="character-display">
      <h2>캐릭터 정보</h2>

      {/* 기본 정보 */}
      <div className="character-basic-info">
        <p>이름: {character.characterName}</p>
        <p>나이: {character.characterAge}</p>
        <p>ID: {character.characterId}</p>
      </div>

      {/* 얼굴 정보 */}
      <div className="character-face">
        <h3>얼굴</h3>
        <div className="face-details">
          <p>피부색: {character.face.skinColor.name}</p>
          <p>헤어스타일: {character.face.hair.name}</p>
          <p>표정: {character.face.expression.name}</p>
        </div>
      </div>

      {/* 의상 정보 */}
      <div className="character-outfit">
        <h3>의상</h3>
        <div className="outfit-details">
          <p>상의: {character.outfit.top.name}</p>
          <p>하의: {character.outfit.bottom.name}</p>
          <p>신발: {character.outfit.shoes.name}</p>
        </div>
      </div>

      {/* 아이템 정보 */}
      <div className="character-items">
        <h3>장착 아이템</h3>
        <div className="items-details">
          {character.item.head.name && (
            <p>머리 아이템: {character.item.head.name}</p>
          )}
          {character.item.eyes.name && (
            <p>눈 아이템: {character.item.eyes.name}</p>
          )}
          {character.item.ears.name && (
            <p>귀 아이템: {character.item.ears.name}</p>
          )}
          {character.item.neck.name && (
            <p>목 아이템: {character.item.neck.name}</p>
          )}
          {character.item.leftWrist.name && (
            <p>왼 손목 아이템: {character.item.leftWrist.name}</p>
          )}
          {character.item.rightWrist.name && (
            <p>오른 손목 아이템: {character.item.rightWrist.name}</p>
          )}
          {character.item.leftHand.name && (
            <p>왼손 아이템: {character.item.leftHand.name}</p>
          )}
          {character.item.rightHand.name && (
            <p>오른손 아이템: {character.item.rightHand.name}</p>
          )}
        </div>
      </div>

      {/* 배경 */}
      {character.background.name && (
        <div className="character-background">
          <h3>배경</h3>
          <p>배경: {character.background.name}</p>
        </div>
      )}
    </div>
  );
};

export default CharacterDisplay;