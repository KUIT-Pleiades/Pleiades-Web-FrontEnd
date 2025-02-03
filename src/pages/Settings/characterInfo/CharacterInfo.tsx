import { useCharacterStore } from "../../../store/useCharacterStore";
import { Character } from "../../../interfaces/Interfaces";


export default function CharacterDisplay() {
  // Zustand store에서 character 상태 가져오기
  const character: Character = useCharacterStore((state) => state.character);

  return (
    <div className="character-display">
      <h2>캐릭터 정보</h2>

      {/* 기본 정보 */}
      <div className="character-basic-info">
        <p>이름: {character.username}</p>
        <p>
          나이:{character.birthDate}
        </p>
        <p>ID: {character.userId}</p>
      </div>

      {/* 얼굴 정보 */}
      <div className="character-face">
        <h3>얼굴</h3>
        <div className="face-details">
          <p>피부색: {character.face.skinColor}</p>
          <p>헤어스타일: {character.face.hair}</p>
          <p>표정: {character.face.expression}</p>
        </div>
      </div>

      {/* 의상 정보 */}
      <div className="character-outfit">
        <h3>의상</h3>
        <div className="outfit-details">
          <p>상의: {character.outfit.top}</p>
          <p>하의: {character.outfit.bottom}</p>
          <p>신발: {character.outfit.shoes}</p>
        </div>
      </div>

      {/* 아이템 정보 */}
      <div className="character-items">
        <h3>장착 아이템</h3>
        <div className="items-details">
          {character.item.head && (
            <p>머리 아이템: {character.item.head}</p>
          )}
          {character.item.eyes && (
            <p>눈 아이템: {character.item.eyes}</p>
          )}
          {character.item.ears  && (
            <p>귀 아이템: {character.item.ears}</p>
          )}
          {character.item.neck && (
            <p>목 아이템: {character.item.neck}</p>
          )}
          {character.item.leftWrist && (
            <p>왼 손목 아이템: {character.item.leftWrist}</p>
          )}
          {character.item.rightWrist && (
            <p>오른 손목 아이템: {character.item.rightWrist}</p>
          )}
          {character.item.leftHand && (
            <p>왼손 아이템: {character.item.leftHand}</p>
          )}
          {character.item.rightHand && (
            <p>오른손 아이템: {character.item.rightHand}</p>
          )}
        </div>
      </div>

      {/* 배경 */}
      {character.backgroundName && (
        <div className="character-background">
          <h3>배경</h3>
          <p>배경: {character.backgroundName}</p>
        </div>
      )}
    </div>
  );
};

