import s from './profileSetUp.module.scss';
//import profile from '../../mock/character1.json'
import character1face from "../../assets/Character/face/character1face.png";
import character1body from "../../assets/Character/body/character1body.png";
import catEar from "../../assets/Character/accessory/catEar.png";
import characterBackground from "../../assets/backgroundImg/characterBackground.png";
import { Character } from "../../interfaces/Interfaces";

interface ProfileSetUpProps {
  character: Character;
  onUpdateCharacter: (updates: Partial<Character>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const ProfileSetUp = ({
  character,
  onUpdateCharacter,
  onNext,
  onPrev,
}: ProfileSetUpProps) => {
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateCharacter({ characterName: e.target.value });
  }; // 캐릭터 이름 입력

  return (
    <>
      <div className={s.showCharacter}>
        <button className={s.previousBtn} onClick={onPrev}>
          이전
        </button>
        <p className={s.pHeader}>캐릭터 설정하기</p>
        <button className={s.nextBtn} onClick={onNext}>
          다음
        </button>
        <p className={s.pDescription}>내 캐릭터에 이름과 나이를 지어주세요!</p>
        <img
          className={s.characterFace}
          src={character1face}
          alt="캐릭터3얼굴"
        />
        <img className={s.characterBody} src={character1body} alt="캐릭터1몸" />
        <img className={s.characterAccessory} src={catEar} alt="" />
        <img
          className={s.characterBackground}
          src={characterBackground}
          alt="캐릭터후광"
        />
      </div>
      <div className={s.inputContainer}>
        <input
          type="text"
          value={character.characterName || ""}
          onChange={handleNameChange}
          placeholder="캐릭터의 이름을 지어주세요"
          className={s.nameInput}
        />
        <div className={s.IdContainer}>
          <div className={s.id}>ID</div>
          <input
            type="text"
            value={character.characterId || ""}
            //onChange={handleIdChange}
            placeholder="영문, 숫자 조합 4-10자리"
            className={s.idInput}
          />
          
        </div>
      </div>
    </>
  );
};

export default ProfileSetUp;
