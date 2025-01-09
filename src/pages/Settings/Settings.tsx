import { useState } from "react";
import CharacterSetUp from "./CharacterSetUp";
import ProfileSetUp from "./ProfileSetUp";
import BackgroundSetUp from "./BackgroundSetUp";
import { Character } from "../../interfaces/Interfaces";

const Settings = () => {
  const [step, setstep] = useState(0);

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
    <div>
      {step === 0 && (
        <CharacterSetUp
          character={character}
          onUpdateCharacter={updateCharacter}
          onNext={() => setstep(1)}
        />
      )}
      {step === 1 && (
        <ProfileSetUp
          character={character}
          onUpdateCharacter={updateCharacter}
          onNext={() => setstep(2)}
          onPrev={() => setstep(0)}
        />
      )}
      {step === 2 && (
        <BackgroundSetUp
          // character={character}
          // onUpdateCharacter={updateCharacter}
          onNext={() => setstep(3)}
          onPrev={() => setstep(1)}
        />
      )}
    </div>
  );
};

export default Settings;
