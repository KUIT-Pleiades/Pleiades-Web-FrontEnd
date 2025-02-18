import { useState } from "react";
import CharacterSetUp from "./CharacterSetUp";
import ProfileSetUp from "./ProfileSetUp";
import BackgroundSetUp from "./BackgroundSetUp";
import { useLocation } from "react-router-dom";

const CharacterSettings = () => {
  const [step, setStep] = useState(0);
  const location = useLocation();
  const isOnboarding = location.pathname.includes("onboarding");

  return (
    <div
      style={{
        width: "clamp(320px, 100dvw, 428px)",
        height: "max(667px, min(100dvh, 926px))",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {step === 0 && (
        <CharacterSetUp
          onNext={() => (isOnboarding ? setStep(1) : setStep(2))}
        />
      )}
      {step === 1 && (
        <ProfileSetUp onNext={() => setStep(2)} onPrev={() => setStep(0)} />
      )}
      {step === 2 && (
        <BackgroundSetUp
          onPrev={() => (isOnboarding ? setStep(1) : setStep(0))}
        />
      )}
    </div>
  );
};

export default CharacterSettings;
