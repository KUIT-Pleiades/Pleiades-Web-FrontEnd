import Calendar from "react-calendar";
//import "react-calendar/dist/Calendar.css";
import s from "./profileSetUp.module.scss";
import characterBackground from "../../assets/backgroundImg/characterBackground.png";
import React, { useState } from "react";
import { useCharacterStore } from "../../store/useCharacterStore";



const IMG_BASE_URL: string = import.meta.env.VITE_PINATA_ENDPOINT;

interface ProfileSetUpProps {
  onNext: () => void;
  onPrev: () => void;
}

// interface BirthDateType {
//   year: string;
//   month: string;
//   day: string;
// }

const ProfileSetUp = ({ onNext, onPrev }: ProfileSetUpProps) => {
  const { userInfo, updateUserInfo } = useCharacterStore();
  const [isValidId, setIsValidId] = useState<boolean>(false);
  const [idExists, setIdExists] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("중복확인");
  const [idCheckMessage, setIdCheckMessage] = useState<string>("");
  const [isIdChecked, setIsIdChecked] = useState<boolean>(false);

  type DatePiece = Date | null;
  type SelectedDate = DatePiece | [DatePiece, DatePiece];

  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());

  const isFormComplete = () => {
    return (
      userInfo.userName && // 이름 입력 확인
      userInfo.userId && // ID 입력 확인
      idExists
      // && // ID 중복 확인 완료
      // birthDate.year && // 생년 입력 확인
      // birthDate.month && // 월 입력 확인
      // birthDate.day && // 일 입력 확인
      // isValidBirthDate() // 생년월일 유효성 확인
    );
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateUserInfo({ userName: e.target.value });
  };

  // ID 유효성 검사 함수
  const validateId = (id: string): boolean => {
    // 영문, 숫자 조합 4-10자리 검사
    const idRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{4,10}$/;
    return idRegex.test(id);
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newId = e.target.value;
    updateUserInfo({ userId: newId });
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
            src={`${IMG_BASE_URL}${userInfo.face.skinColor}.png`}
            alt="skin"
          />
          <img
            className={s.characterFace}
            src={`${IMG_BASE_URL}${userInfo.face.expression}.png`}
            alt="face"
          />
          <img
            className={s.characterHair}
            src={`${IMG_BASE_URL}${userInfo.face.hair}.png`}
            alt="hair"
          />
          <img
            className={s.characterTop}
            src={`${IMG_BASE_URL}${userInfo.outfit.top}.png`}
            alt="top"
          />
          <img
            className={s.characterBottom}
            src={`${IMG_BASE_URL}${userInfo.outfit.bottom}.png`}
            alt="bottom"
          />
          <img
            className={s.characterShoes}
            src={`${IMG_BASE_URL}${userInfo.outfit.shoes}.png`}
            alt="shoes"
          />
          {userInfo.item.head && (
            <img
              className={s.characterItem}
              src={`${IMG_BASE_URL}${userInfo.item.head}.png`}
              alt="headItem"
            />
          )}
          {userInfo.item.eyes && (
            <img
              className={s.characterItem}
              src={`${IMG_BASE_URL}${userInfo.item.eyes}.png`}
              alt="faceItem"
            />
          )}
          {userInfo.item.ears && (
            <img
              className={s.characterItem}
              src={`${IMG_BASE_URL}${userInfo.item.ears}.png`}
              alt="earItem"
            />
          )}
          {userInfo.item.neck && (
            <img
              className={s.characterItem}
              src={`${IMG_BASE_URL}${userInfo.item.neck}.png`}
              alt="neckItem"
            />
          )}
          {userInfo.item.leftWrist && (
            <img
              className={s.characterItem}
              src={`${IMG_BASE_URL}${userInfo.item.leftWrist}.png`}
              alt="handItem"
            />
          )}
          {userInfo.item.rightWrist && (
            <img
              className={s.characterItem}
              src={`${IMG_BASE_URL}${userInfo.item.rightWrist}.png`}
              alt="handItem"
            />
          )}
          {userInfo.item.leftHand && (
            <img
              className={s.characterItem}
              src={`${IMG_BASE_URL}${userInfo.item.leftHand}.png`}
              alt="handItem"
            />
          )}
          {userInfo.item.rightHand && (
            <img
              className={s.characterItem}
              src={`${IMG_BASE_URL}${userInfo.item.rightHand}.png`}
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
          value={userInfo.userName || ""}
          onChange={handleNameChange}
          placeholder="15자 이하로 입력"
          className={s.nameInput}
        />
        <div className={s.IdContainer}>
          <div className={s.id}>ID</div>
          <input
            type="text"
            value={userInfo.userId || ""}
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
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            view="month"
            formatDay={(_, date) => date.getDate().toString()}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileSetUp;
