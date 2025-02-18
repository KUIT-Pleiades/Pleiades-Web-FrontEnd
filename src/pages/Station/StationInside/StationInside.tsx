import { useState, useEffect } from "react";
import { fetchRequest } from "../../../functions/fetchRequest";
import s from "./StationInside.module.scss";
import stationBackgroundImg_01 from "../../../assets/backgroundImg/stationbackgroundImg/stationBackgroundImg_01.png";
import backBtn from "../../../assets/btnImg/whiteBackBtn.png";
import customBtn from "../../../assets/btnImg/customBtn.png";
import settingBtn from "../../../assets/btnImg/settingBtn.png";
import messageBtn from "../../../assets/btnImg/messageBtn.svg";
import character_01 from "../../../assets/Character/character1.svg";
import StationSlide from "../StationSlide/StationSlide";
import StationReport from "./StationReport/StationReport";
import MyReport from "./CharacterReport/MyReport";
import CharacterReport from "./CharacterReport/CharacterReport";

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

const StationInside: React.FC = () => {
  const [stationData, setStationData] = useState<StationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [showSlide, setShowSlide] = useState(false);
  const [selectedMember, setSelectedMember] = useState<StationMember | null>(
    null
  );

  const handleSettingClick = () => {
    setShowSlide(true);
  };

  // 현재 로그인한 사용자의 ID (예시)
  const currentUserId = "현재_사용자_ID";

  // 멤버 클릭 핸들러 추가
  const handleMemberClick = (member: StationMember) => {
    setSelectedMember(member);
  };

  const stationId = "ABCDEF"; // 실제 stationId 필요

  useEffect(() => {
    const getStationData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchRequest<StationResponse>(
          `/stations/${stationId}`,
          "GET",
          null
        );
        if (response) {
          setStationData(response);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    getStationData();
  }, [stationId]);

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!stationData) return null;

  return (
    <div
      className={s.container}
      style={{
        backgroundImage: `url(${stationBackgroundImg_01})`,
      }}
    >
      {!stationData.reportWritten && <StationReport stationId={stationId} />}
      <div className={s.headerContainer}>
        <div className={s.backBtn}>
          <img src={backBtn} alt="뒤로가기" />
        </div>
        <div className={s.header}>
          <h2>[ {stationData.name} ]</h2>
          <p>{stationData.intro}</p>
        </div>
        <div className={s.btnGroup}>
          <div className={s.customBtn}>
            <img src={customBtn} alt="" />
          </div>
          <div className={s.settingBtn} onClick={handleSettingClick}>
            <img src={settingBtn} alt="" />
          </div>
        </div>
      </div>

      <div className={s.content}>
        <div className={s.memberList}>
          {stationData.stationMembers.map((member) => (
            <div
              key={member.userId}
              className={s.memberItem}
              style={{
                position: "fixed",
                left: `${member.positionX}dvw`,
                top: `${member.positionY}dvh`,
                width: "30dvw",
              }}
            >
              <img
                src={character_01}
                alt=""
                style={{
                  position: "fixed",
                  left: `${member.positionX}dvw`,
                  top: `${member.positionY}dvh`,
                  width: "30dvw",
                }}
              />
              {member.todayReport && (
                <div
                  className={s.messageIcon}
                  style={{
                    position: "fixed",
                    left: `${member.positionX}dvw`,
                    top: `${member.positionY}dvh`,
                    zIndex: 100,
                  }}
                >
                  <img
                    src={messageBtn}
                    alt="리포트"
                    style={{
                      position: "fixed",
                      left: `${member.positionX+20}dvw`,
                      top: `${member.positionY+2}dvh`,
                      zIndex: 100,
                      height: "7dvw",
                    }}
                    onClick={() => handleMemberClick(member)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {showSlide && (
        <StationSlide
          stationData={stationData}
          onClose={() => setShowSlide(false)}
        />
      )}
      {selectedMember &&
        (selectedMember.userId === currentUserId ? (
          <MyReport
            onClose={() => setSelectedMember(null)}
            stationId={stationId}
            userId={selectedMember.userId}
          />
        ) : (
          <CharacterReport
            memberName={selectedMember.userName}
            onClose={() => setSelectedMember(null)}
            stationId={stationId}
            userId={selectedMember.userId}
          />
        ))}
    </div>
  );
};

export default StationInside;
