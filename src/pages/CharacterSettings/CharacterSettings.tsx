import { useState } from "react";
import CharacterSetUp from "./CharacterSetUp";
import ProfileSetUp from "./ProfileSetUp";
import BackgroundSetUp from "./BackgroundSetUp";
import {
  Character,
  CharacterImg,
  Message,
  UserInfo,
} from "../../interfaces/Interfaces";
import { useCharacterStore } from "../../store/useCharacterStore";
import { fetchRequest } from "../../functions/fetchRequest";
import { useNavigate } from "react-router-dom";

const CharacterSettings = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const character = useCharacterStore((state) => state.userInfo);

  const complete = async () => {
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

    const response = await fetch("http://image-maker-nine.vercel.app/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(imageRequestData),
    });

    if (!response.ok) {
      console.log("이미지 생성에 실패했습니다");
    }
    const data: CharacterImg = await response.json();

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
      console.log("회원가입 실패");
    } else if (signupResponse.message === "duplicate user") {
      console.log("회원가입 실패:", signupResponse.message);
      navigate("/login");
    } else {
      console.log("회원가입 성공:", signupResponse.message);
      navigate("/home");
    }
  };

  return (
    <div
      style={{
        width: "clamp(320px, 100dvw, 428px)",
        height: "max(667px, min(100dvh, 926px))",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {step === 0 && <CharacterSetUp onNext={() => setStep(1)} />}
      {step === 1 && (
        <ProfileSetUp onNext={() => setStep(2)} onPrev={() => setStep(0)} />
      )}
      {step === 2 && (
        <BackgroundSetUp complete={() => complete} onPrev={() => setStep(1)} />
      )}
    </div>
  );
};

export default CharacterSettings;
