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

  const handleSettingClick = () => {
    setShowSlide(true);
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
              }}
            >
              <img
                src={character_01}
                style={{
                  height: "30dvh",
                }}
                alt=""
              />
              {!member.todayReport && (
                <div
                  className={s.messageIcon}
                  style={{
                    position: "fixed",
                    left: `${member.positionX + 25}dvw`,
                    top: `${member.positionY}dvh`,
                  }}
                >
                  <img
                    src={messageBtn}
                    alt="리포트"
                    style={{
                      height: "5dvh",
                    }}
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
    </div>
  );
};

export default StationInside;
