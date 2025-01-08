import s from './profileSetUp.module.scss';
//import profile from '../../mock/character1.json'
import character1face from "../../assets/Character/face/character1face.png";
import character1body from "../../assets/Character/body/character1body.png";
import catEar from "../../assets/Character/accessory/catEar.png";
import characterBackground from "../../assets/backgroundImg/characterBackground.png";
import { useState } from 'react';

interface ProfileSetUpProps {
  onNext: () => void;
  onPrev: () => void;
}

const ProfileSetUp = ({ onNext, onPrev }: ProfileSetUpProps) => {
  // const [profileData, setProfileData] = useState<Character>({
  //   characterId: "",
  //   characterName: "",
  //   characterAge: 0,
  //   face: {
  //     skinColor: {
  //       name: "", // white, yellow...
  //       imgurl: "",
  //     },
  //     hair: {
  //       name: "",
  //       imgurl: "",
  //     },
  //     expression: {
  //       name: "",
  //       imgurl: "",
  //     },
  //   },
  //   outfit: {
  //     top: {
  //       name: "",
  //       imgurl: "",
  //     },
  //     bottom: {
  //       name: "",
  //       imgurl: "",
  //     },
  //     shoes: {
  //       name: "",
  //       imgurl: "",
  //     },
  //   },
  //   accessories: {
  //     name: "",
  //     imgurl: "",
  //   },
  //   background: {
  //     name: "",
  //     imgurl: "",
  //   },
  // });

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
    </>
  );
};

export default ProfileSetUp;
