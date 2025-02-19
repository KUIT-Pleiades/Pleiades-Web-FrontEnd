import { useCharacterStore } from "../../../store/useCharacterStore";
import { fetchRequest } from "../../../functions/fetchRequest";
import {
  Character,
  CharacterImg,
  Message,
  UserInfo,
} from "../../../interfaces/Interfaces";

export default function CharacterDisplay() {
  const character = useCharacterStore((state) => state.userInfo);

  const handleSubmit = async () => {
    try {
      // 첫 번째 요청: 이미지 생성
      const imageRequestData: Character = {
        userId: character.userId,
        userName: character.userName,
        birthDate: character.birthDate,
        starBackground: character.starBackground,
        face: {
          skinColor: character.face.skinColor,
          hair: character.face.hair,
          expression: character.face.expression,
        },
        outfit: {
          top: character.outfit.top,
          bottom: character.outfit.bottom,
          shoes: character.outfit.shoes,
        },
        item: {
          head: character.item.head,
          eyes: character.item.eyes,
          ears: character.item.ears,
          neck: character.item.neck,
          leftWrist: character.item.leftWrist,
          rightWrist: character.item.rightWrist,
          leftHand: character.item.leftHand,
          rightHand: character.item.rightHand,
        },
      };

      const response = await fetch(
        "http://image-maker-nine.vercel.app/profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(imageRequestData),
        }
      );

      if (!response.ok) {
        console.log("이미지 생성에 실패했습니다");
        return;
      }

      const data: CharacterImg = await response.json();
      console.log(data);

      // 두 번째 요청: 회원가입
      const signupData: UserInfo = {
        ...imageRequestData,
        profile: data.profile, // 첫 번째 요청에서 받은 이미지 URL
        character: data.character, // 첫 번째 요청에서 받은 이미지 URL
      };
      console.log(data.profile);
      console.log(data.character);

      const signupResponse = await fetchRequest<Message>(
        "/auth/signup",
        "POST",
        signupData
      );

      if (signupResponse === null) {
        console.log("회원가입에 실패했습니다");
      } else if (
        signupResponse.message === "sign-up success - character created"
      )
        console.log("회원가입 성공:", signupResponse);
      alert("캐릭터 생성 및 회원가입이 완료되었습니다!");
    } catch (error) {
      console.error("오류 발생:", error);
      alert("처리 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="character-display">
      <h2>캐릭터 정보</h2>

      {/* 기본 정보 */}
      <div className="character-basic-info">
        <p>이름: {character.userName}</p>
        <p>나이:{character.birthDate}</p>
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
          {character.item.head && <p>머리 아이템: {character.item.head}</p>}
          {character.item.eyes && <p>눈 아이템: {character.item.eyes}</p>}
          {character.item.ears && <p>귀 아이템: {character.item.ears}</p>}
          {character.item.neck && <p>목 아이템: {character.item.neck}</p>}
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
      {character.starBackground && (
        <div className="character-background">
          <h3>배경</h3>
          <p>배경: {character.starBackground}</p>
        </div>
      )}
      <div className="submit-button-container">
        <button onClick={handleSubmit} className="submit-button">
          완료
        </button>
      </div>
    </div>
  );
}
