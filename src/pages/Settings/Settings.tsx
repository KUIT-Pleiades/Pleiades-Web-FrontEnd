import { useState } from "react";
import CharacterSetUp from "./CharacterSetUp";
import ProfileSetUp from "./ProfileSetUp";
import BackgroundSetUp from "./BackgroundSetUp";

const Settings = () => {
	const [step, setstep] = useState(0);


  return (
    <div>
      {step === 0 && <CharacterSetUp onNext={() => setstep(1)} />}
      {step === 1 && (
        <ProfileSetUp onNext={() => setstep(2)} onPrev={() => setstep(0)} />
      )}
      {step === 2 && (
        <BackgroundSetUp onNext={() => setstep(3)} onPrev={() => setstep(1)} />
      )}
    </div>
  );
};

export default Settings;
