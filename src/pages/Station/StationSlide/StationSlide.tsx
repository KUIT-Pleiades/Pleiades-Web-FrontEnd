import s from "./StationSlide.module.scss";
import React, { useState } from "react";
import { useCharacterStore } from "../../../store/useCharacterStore";
import planetIcon from "../../../assets/Icon/planet.svg";
import stationBackgroundImg_01 from "../../../assets/backgroundImg/stationbackgroundImg/stationBackgroundImg_01.png";
import characterProfile from "../../../assets/Character/profile/characterProfile.svg"
import copyBtn from "../../../assets/btnImg/copyBtn.png"
import plusBtn from "../../../assets/btnImg/plusBtn.png"
import onerIcon from "../../../assets/Icon/oner.png"
import messageIcon from "../../../assets/Icon/messageIcon.png"
import signalBtn from "../../../assets/btnImg/signalBtn.png"

interface StationMember {
  userId: string;
  userName: string;
  character: string;
  profile: string;
  positionX: number;
  positionY: number;
	todayReport: boolean;
	isFriend: boolean;
}

interface StationResponse {
  stationId: string;
  adminUserId: string;
  name: string;
  intro: string;
  numOfUsers: number;
  stationBackground: string;
  reportNoticeTime: string;
  reportWritten: boolean;
  stationMembers: StationMember[];
}

interface StationSlideProps {
  stationData: StationResponse;
  onClose: () => void;
}

const StationSlide: React.FC<StationSlideProps> = ({
  stationData,
  onClose,
}) => {
  const handleSlideClick = (e: React.MouseEvent) => {
    // 이벤트 전파를 막아서 container의 onClick이 실행되지 않게 함
    e.stopPropagation(); 
	};

	const [isCopied, setIsCopied] = useState(false);

	const handleCopyClick = async () => {
    try {
      // 클립보드에 정거장 ID를 복사
      await navigator.clipboard.writeText(stationData.stationId);
      // 복사 완료 상태로 변경
      setIsCopied(true);
      // 2초 후에 복사 상태 초기화
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("복사 실패:", err);
    }
  };
	
	const character = useCharacterStore((state) => state.userInfo);

  return (
    <div className={s.container} onClick={onClose}>
      <div className={s.overlay}>
        <div className={s.slide} onClick={handleSlideClick}>
          <div className={s.headerContainer}>
            <div
              className={s.background}
              style={{
                backgroundImage: `url(${stationBackgroundImg_01})`,
              }}
            ></div>
            <div className={s.planetIcon}>
              <img src={planetIcon} alt="" />
            </div>
            <div className={s.header}>
              <h2>[ {stationData.name} ]</h2>
              <p>{stationData.intro}</p>
              <div className={s.codeCopy} onClick={handleCopyClick}>
                <img src={copyBtn} alt="" />
                {isCopied ? "복사 완료!" : "정거장 코드 복사"}
              </div>
            </div>
          </div>

          <div className={s.content}>
            <div className={s.settingButton}>
              정거장 설정
              <span className={s.arrow}>›</span>
            </div>

            <div className={s.memberSection}>
              <div className={s.memberTitle}>
                멤버 ({stationData.numOfUsers})
              </div>
              <button className={s.addMemberButton}>
                <img src={plusBtn} alt="" /> 친구 초대하기
              </button>

              <div className={s.memberList}>
                {stationData.stationMembers.map((member) => (
                  <div key={member.userId} className={s.memberItem}>
                    <div className={s.avatar}>
                      <img src={characterProfile} alt="profile" />
                      {stationData.adminUserId === member.userId && (
                        <img src={onerIcon} alt="방장" className={s.onerIcon} />
                      )}
                      {member.todayReport && (
                        <img
                          src={messageIcon}
                          alt="메세지 아이콘"
                          className={s.messageIcon}
                        />
                      )}
                    </div>
                    <div className={s.memberInfo}>
                      <div>{member.userName}</div>
                      <div className={s.memberHandle}>
                        @{member.userId}
                        {character.userId}
                      </div>
                    </div>
                    {!member.isFriend && member.userId !== character.userId && (
                      <img
                        src={signalBtn}
                        alt="signal button"
                        className={s.signalBtn}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button className={s.bottomButton}>우주정거장 폭파 및 나가기</button>
        </div>
      </div>
    </div>
  );
};

export default StationSlide;
