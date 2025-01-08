import { Character } from "../../interfaces/Interfaces";

interface BackgroundSetUpProps {
  character: Character;
  onUpdateCharacter: (updates: Partial<Character>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const BackgroundSetUp = ({ character, onUpdateCharacter ,onNext, onPrev }: BackgroundSetUpProps) => {
  return (
    <div>
      <h1>배경 설정</h1>
      <p>배경 설정 페이지입니다.</p>
      <div>
        <button onClick={onPrev}>이전</button>
        <button onClick={onNext}>완료</button>
      </div>
    </div>
  );
};

export default BackgroundSetUp;
