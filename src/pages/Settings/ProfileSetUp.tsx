import s from "./profileSetUp.module.scss";
import characterBackground from "../../assets/backgroundImg/characterBackground.png";
import React, { useState } from "react";
import { useCharacterStore } from "../../store/useCharacterStore";

interface ProfileSetUpProps {
  onNext: () => void;
  onPrev: () => void;
}

interface BirthDateType {
  year: string;
  month: string;
  day: string;
}

const ProfileSetUp = ({ onNext, onPrev }: ProfileSetUpProps) => {
  const { character, updateCharacter } = useCharacterStore();
  const [isValidId, setIsValidId] = useState<boolean>(false);
  const [idExists, setIdExists] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("중복확인");
  const [idCheckMessage, setIdCheckMessage] = useState<string>("");
  const [isIdChecked, setIsIdChecked] = useState<boolean>(false);
  const [birthDate, setBirthDate] = useState<BirthDateType>({
    year: "",
    month: "",
    day: "",
  });

  const isFormComplete = () => {
    return (
      character.characterName && // 이름 입력 확인
      character.characterId && // ID 입력 확인
      idExists && // ID 중복 확인 완료
      birthDate.year && // 생년 입력 확인
      birthDate.month && // 월 입력 확인
      birthDate.day && // 일 입력 확인
      isValidBirthDate() // 생년월일 유효성 확인
    );
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateCharacter({ characterName: e.target.value });
  };

  // ID 유효성 검사 함수
  const validateId = (id: string): boolean => {
    // 영문, 숫자 조합 4-10자리 검사
    const idRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{4,10}$/;
    return idRegex.test(id);
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newId = e.target.value;
    updateCharacter({ characterId: newId });
    setIsValidId(validateId(newId));
    // ID가 변경되면 중복확인 상태 초기화
    setIdExists(false);
    setButtonText("중복확인");
  };

  const idCheck = () => {
    setIdExists(!idExists);
    setButtonText(idExists ? "중복확인" : "사용가능"); // 아직 서버와 연결되지 않아서 단순히 디자인만 구현, 바뀌기만 함
    if (!idExists) {
      setIdExists(true);
      setButtonText("사용가능");
      setIdCheckMessage("사용 가능한 ID입니다.");
    } else {
      setIdExists(false);
      setButtonText("중복확인");
      setIdCheckMessage("이미 사용중인 ID입니다.");
    }
    setIsIdChecked(true);
  };

  //   // 초기 상태
  // isValidId = false (버튼 비활성화)
  // idExists = false (중복확인 안 된 상태)
  // buttonText = "중복확인"

  // // ID 입력이 유효할 때
  // isValidId = true (버튼 활성화)
  // idExists = false (아직 중복확인 안 함)
  // buttonText = "중복확인"

  // // 중복확인 버튼 클릭 후
  // isValidId = true (버튼 활성화 유지)
  // idExists = true (중복확인 완료)
  // buttonText = "사용가능"

  // 생년월일 입력 핸들러
  const handleBirthDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: keyof BirthDateType
  ) => {
    let value = e.target.value.replace(/[^0-9]/g, "");

    // 길이 제한
    if (type === "year" && value.length > 4) {
      value = value.slice(0, 4);
    }
    if ((type === "month" || type === "day") && value.length > 2) {
      value = value.slice(0, 2);
    }

    // 먼저 입력값 업데이트
    setBirthDate((prev) => ({
      ...prev,
      [type]: value,
    }));

    const newBirthDate = {
      ...birthDate,
      [type]: value,
    };

    if (newBirthDate.year && newBirthDate.month && newBirthDate.day) {
      try {
        const birthDateTime = new Date(
          Number(newBirthDate.year),
          Number(newBirthDate.month) - 1,
          Number(newBirthDate.day)
        );

        if (!isNaN(birthDateTime.getTime())) {
          updateCharacter({ birthDate: birthDateTime });
        }
      } catch (error) {
        console.error("Invalid date:", error);
      }
    }
    
  };

  const isValidBirthDate = () => {
    const date = new Date(
      Number(birthDate.year),
      Number(birthDate.month) - 1,
      Number(birthDate.day)
    );
    return !isNaN(date.getTime());
  };

  const handleNext = () => {
    if (isFormComplete()) {
      onNext();
    } else {
      alert("정보를 모두 입력해 주세요");
    }
  };

  

  return (
    <div className={s.profileSetUpContainer}>
      <div className={s.showCharacter}>
        <button className={s.previousBtn} onClick={onPrev}>
          이전
        </button>
        <p className={s.pHeader}>캐릭터 설정하기</p>
        <button className={s.nextBtn} onClick={handleNext}>
          다음
        </button>
        <p className={s.pDescription}>내 캐릭터에 이름과 나이를 지어주세요!</p>
        <div className={s.characterContainer}>
          <img
            className={s.characterSkin}
            src={character.face.skinColor.imgurl}
            alt="skin"
          />
          <img
            className={s.characterFace}
            src={character.face.expression.imgurl}
            alt="expression"
          />
          <img
            className={s.characterHair}
            src={character.face.hair.imgurl}
            alt="hair"
          />
          <img
            className={s.characterTop}
            src={character.outfit.top.imgurl}
            alt="top"
          />
          <img
            className={s.characterBottom}
            src={character.outfit.bottom.imgurl}
            alt="bottom"
          />
          <img
            className={s.characterShoes}
            src={character.outfit.shoes.imgurl}
            alt="shoes"
          />
          {character.item.head.imgurl && (
            <img
              className={s.characterItem}
              src={character.item.head.imgurl}
              alt="headItem"
            />
          )}
          {character.item.eyes.imgurl && (
            <img
              className={s.characterItem}
              src={character.item.eyes.imgurl}
              alt="faceItem"
            />
          )}
          {character.item.ears.imgurl && (
            <img
              className={s.characterItem}
              src={character.item.ears.imgurl}
              alt="earItem"
            />
          )}
          {character.item.neck.imgurl && (
            <img
              className={s.characterItem}
              src={character.item.neck.imgurl}
              alt="neckItem"
            />
          )}
          {character.item.leftWrist.name && (
            <img
              className={s.characterItem}
              src={character.item.leftWrist.imgurl}
              alt="handItem"
            />
          )}
          {character.item.rightWrist.name && (
            <img
              className={s.characterItem}
              src={character.item.rightWrist.imgurl}
              alt="handItem"
            />
          )}
          {character.item.leftHand.name && (
            <img
              className={s.characterItem}
              src={character.item.leftHand.imgurl}
              alt="handItem"
            />
          )}
          {character.item.rightHand.name && (
            <img
              className={s.characterItem}
              src={character.item.rightHand.imgurl}
              alt="handItem"
            />
          )}
        </div>
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
            onChange={handleIdChange}
            placeholder="영문, 숫자 조합 4-10자리"
            className={s.idInput}
          />
          {isIdChecked && ( // 중복 확인 버튼을 눌렀을 때만 메시지 표시
            <div
              className={`${s.idCheckMessage} ${
                idExists ? s.available : s.unavailable
              }`}
            >
              {idCheckMessage}
            </div>
          )}
          <button
            onClick={idCheck}
            className={`${s.checkBtn} ${idExists ? s.available : ""}`}
            disabled={!isValidId}
          >
            {buttonText}
          </button>
        </div>
        <div className={s.ageContainer}>
          <div className={s.age}>생년월일</div>
          <div className={s.ageInput}>
            <input
              type="text"
              value={birthDate.year}
              onChange={(e) => handleBirthDateChange(e, "year")}
              className={s.yearInput}
            />
            <div>년</div>
            <div className={s.divider}>/</div>
            <input
              type="text"
              value={birthDate.month}
              onChange={(e) => handleBirthDateChange(e, "month")}
            />
            <div>월</div>
            <div className={s.divider}>/</div>
            <input
              type="text"
              value={birthDate.day}
              onChange={(e) => handleBirthDateChange(e, "day")}
            />
            <div>일</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetUp;
