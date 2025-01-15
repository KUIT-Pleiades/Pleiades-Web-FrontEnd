import { useState } from "react";
import CharacterSetUp from "./CharacterSetUp";
import ProfileSetUp from "./ProfileSetUp";
import BackgroundSetUp from "./BackgroundSetUp";
import { useCharacterStore } from "../../store/useCharacterStore";


const Settings = () => {
  const [step, setStep] = useState(0);
  const { character, updateCharacter } = useCharacterStore();

  return (
    <div
      style={{
        width: "clamp(375px, 100dvw, 428px)",
        height: "max(667px, min(100dvh, 926px))",
        position: "relative",
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
        <BackgroundSetUp onNext={() => setStep(3)} onPrev={() => setStep(1)} />
      )}
    </div>
  );
};

export default Settings;
