import { useState } from "react";
import CharacterSetUp from "./CharacterSetUp";
import ProfileSetUp from "./ProfileSetUp";
import BackgroundSetUp from "./BackgroundSetUp";
import { Character } from "../../interfaces/Interfaces";

const Settings = () => {
  const [step, setStep] = useState(0);

  const initialCharacter: Character = {
    characterId: "",
    characterName: "",
    characterAge: 0,
    face: {
      skinColor: {
        name: "",
        imgurl: "",
      },
      hair: {
        name: "",
        imgurl: "",
      },
      expression: {
        name: "",
        imgurl: "",
      },
    },
    outfit: {
      top: {
        name: "",
        imgurl: "",
      },
      bottom: {
        name: "",
        imgurl: "",
      },
      shoes: {
        name: "",
        imgurl: "",
      },
    },
    accessories: {
      name: "",
      imgurl: "",
    },
    background: {
      name: "",
      imgurl: "",
    },
    // Character 인터페이스의 다른 필수 속성들도 기본값으로 초기화
  };

  const [character, setCharacter] = useState<Character>(initialCharacter); // 캐릭터 정보

  const updateCharacter = (updates: Partial<Character>) => {
    setCharacter((prev) => ({
      ...prev,
      ...updates,
    }));
  }; // 캐릭터 정보 업데이트

  return (
    <div
      style={{
        width: "clamp(375px, 100dvw, 428px)",
        height: "max(667px, min(100dvh, 926px))",
      }}
    >
      {step === 0 && (
        <CharacterSetUp
          character={character}
          onUpdateCharacter={updateCharacter}
          onNext={() => setStep(1)}
        />
      )}
      {step === 1 && (
        <ProfileSetUp
          character={character}
          onUpdateCharacter={updateCharacter}
          onNext={() => setStep(2)}
          onPrev={() => setStep(0)}
        />
      )}
      {step === 2 && (
        <BackgroundSetUp
          // character={character}
          // onUpdateCharacter={updateCharacter}
          onNext={() => setStep(3)}
          onPrev={() => setStep(1)}
        />
      )}
    </div>
  );
};

export default Settings;
