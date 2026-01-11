import React, { useState, useCallback } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import { useCharacterStore } from "../../../store/useCharacterStore";
import s from "./ProfileSetting.module.scss";
import backBtn from "../../../assets/btnImg/backBtn.png";
import { axiosRequest } from "../../../functions/axiosRequest";

// interface IdCheckResponse {
//   available: boolean;
//   message: string;
// }

interface ProfileResponse {
  message: string;
}

const ProfileSetting: React.FC = () => {
  const navigate = useNavigate();
  const { userInfo, updateUserInfo } = useCharacterStore();

  // ID 체크 관련 상태
  // const [isValidId, setIsValidId] = useState<boolean>(false);
  // const [idExists, setIdExists] = useState<boolean>(false);
  // const [buttonText, setButtonText] = useState<string>("중복확인");
  // const [idCheckMessage, setIdCheckMessage] = useState<string>("");
  // const [isIdChecked, setIsIdChecked] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isPokePopupVisible, setIsPokePopupVisible] = useState(false);

  type DatePiece = Date | null;
  type SelectedDate = DatePiece | [DatePiece, DatePiece];

  const [selectedDate, setSelectedDate] = useState<SelectedDate>(() => {
    try {
      return userInfo.birthDate ? new Date(userInfo.birthDate) : new Date();
    } catch {
      return new Date();
    }
  });

  // ID 유효성 검사 함수
  // const validateId = (id: string): boolean => {
  //   const idRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{4,10}$/;
  //   return idRegex.test(id);
  // };

  // ID 중복 체크 함수
  // const checkDuplicateId = async (id: string) => {
  //   try {
  //     const response = await fetchRequest<IdCheckResponse>(
  //       `/auth/checkId?userId=${id}`,
  //       "GET",
  //       null
  //     );

  //     if (response === null) {
  //       setIdCheckMessage("서버 연결에 실패했습니다.");
  //       return false;
  //     }

  //     setIdCheckMessage(response.message);
  //     return response.available;
  //   } catch (error) {
  //     console.error("ID 중복확인 오류:", error);
  //     setIdCheckMessage("중복확인 중 오류가 발생했습니다.");
  //     return false;
  //   }
  // };

  // const handleIdCheck = useCallback(async () => {
  //   if (!userInfo.userId) {
  //     setIdCheckMessage("ID를 입력해주세요.");
  //     return;
  //   }

  //   if (!isValidId) {
  //     setIdCheckMessage("올바른 ID 형식이 아닙니다.");
  //     return;
  //   }

  //   const isAvailable = await checkDuplicateId(userInfo.userId);

  //   setIdExists(isAvailable);
  //   setButtonText(isAvailable ? "사용가능" : "중복확인");
  //   setIsIdChecked(true);
  // }, [userInfo.userId, isValidId]);

  const handleDateChange = (date: SelectedDate) => {
    if (date instanceof Date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      updateUserInfo({ birthDate: formattedDate });
    }
  };

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newName = e.target.value.trim();
      if (newName.length <= 15) {
        updateUserInfo({ userName: newName });
      }
    },
    [updateUserInfo]
  );

  // const handleIdChange = useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const newId = e.target.value;
  //     updateUserInfo({ userId: newId });
  //     // setIsValidId(validateId(newId));
  //     setIdExists(false);
  // 		setButtonText("중복확인");
  // 		setIsIdChecked(false);
  //   },
  //   [updateUserInfo]
  // );

  const showErrorPopup = () => {
    setIsPokePopupVisible(true);
    setTimeout(() => {
      setIsPokePopupVisible(false);
    }, 1500);
  };

  const handleConfirm = async () => {
    if (!userInfo.userName?.trim()) {
      setErrorMessage("이름을 입력해주세요.");
      showErrorPopup();
      return;
    }
    // if (!userInfo.userId) {
    //   setErrorMessage("ID를 입력해주세요.");
    //   showErrorPopup();
    //   return;
    // }
    // if (!idExists) {
    //   setErrorMessage("ID 중복확인이 필요합니다.");
    //   showErrorPopup();
    //   return;
    // }
    if (!userInfo.birthDate) {
      setErrorMessage("생년월일을 선택해주세요.");
      showErrorPopup();
      return;
    }

    try {
      const requestBody = {
        // userId: userInfo.userId,
        userName: userInfo.userName,
        birthDate: userInfo.birthDate,
      };

      const response = await axiosRequest<ProfileResponse>(
        "/home/settings/profile",
        "POST",
        requestBody
      );

      if (response && response.message === "profile setting success") {
        // 성공 시 이전 페이지로 이동
        navigate(-1);
      } else if (response === null) {
        // 401(토큰 만료) 또는 403(잘못된 정보) 응답의 경우
        // fetchRequest에서 이미 처리되므로 여기서는 일반적인 에러 메시지 표시
        setErrorMessage("프로필 수정에 실패했습니다. 다시 시도해주세요.");
        showErrorPopup();
      }
    } catch (error) {
      console.error("프로필 수정 오류:", error);
      setErrorMessage("프로필 수정 중 오류가 발생했습니다.");
      showErrorPopup();
    }
  };

  return (
    <div>
      <div className={s.profileContainer}>
        <div className={s.header}>
          <img
            src={backBtn}
            alt=""
            onClick={() => {
              navigate(-1);
            }}
          />
          <div className={s.title}>프로필</div>
          <button onClick={handleConfirm}>확인</button>
        </div>
        <div className={s.container}>
          <div className={s.profileImg}>
            <img src={userInfo.profile} alt="" />
          </div>
          <div className={s.profile}>
            <div className={s.nameInput}>
              <span>이름</span>
              <input
                type="text"
                value={userInfo.userName}
                onChange={handleNameChange}
                placeholder="15자 이하로 입력"
              />
            </div>
            <div className={s.idInput}>
              <div className={s.idHeader}>
                <span>ID</span>
              </div>
              <input
                type="text"
                value={userInfo.userId}
                placeholder="영문, 숫자 조합 4-10자리"
                disabled
                className={s.disabledInput}
              />
            </div>
            <div className={s.ageInput}>
              <span className={s.age}>생년월일</span>
              <Calendar
                onChange={(date) => {
                  setSelectedDate(date);
                  handleDateChange(date as Date);
                }}
                value={selectedDate}
                formatDay={(_, date) => date.getDate().toString()}
              />
            </div>
          </div>
        </div>
      </div>
      {isPokePopupVisible && <div className={s.pokePopup}>{errorMessage}</div>}
    </div>
  );
};

export default ProfileSetting;
