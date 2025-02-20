import React from 'react';
import Calendar from "react-calendar";
import { useNavigate } from 'react-router-dom';
import s from "./ProfileSetting.module.scss"
import backBtn from "../../../assets/btnImg/backBtn.png"

const ProfileSetting: React.FC = () => {
	const navigate = useNavigate();

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
          <button>확인</button>
        </div>
        <div className={s.profileImg}></div>
        <div className={s.profile}>
          <div className={s.nameInput}>
            <span>이름</span>
            <input type="text" />
          </div>
          <div className={s.idInput}>
            <span>ID</span>
            <input type="text" />
          </div>
          <div className={s.ageInput}>
            <span>생년월일</span>
            <Calendar formatDay={(_, date) => date.getDate().toString()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;