import { useState, useEffect } from "react";
import { axiosRequest } from "../../../functions/axiosRequest";
import { useCharacterStore } from "../../../store/useCharacterStore";
import { useNavigate } from "react-router-dom";
import { StationDetails, StationMember } from "../../../interfaces/Interfaces";
import s from "./StationInside.module.scss";
import backBtn from "../../../assets/btnImg/whiteBackBtn.png";
import customBtn from "../../../assets/btnImg/customBtn.png";
import settingBtn from "../../../assets/btnImg/settingBtn.png";
import StationSlide from "../StationSlide/StationSlide";
import StationReport from "./StationReport/StationReport";
import MyReport from "./CharacterReport/MyReport";
import CharacterReport from "./CharacterReport/CharacterReport";
import Pending from "../../PageManagement/Pending";
import DraggableMember from "./DraggableMember";
import { trackEvent } from "../../../utils/analytics"; // [Insight] GA 이벤트를 위해 임포트

const IMG_BASE_URL: string = import.meta.env.VITE_IMG_BASE_URL;

const StationInside: React.FC = () => {
  const navigate = useNavigate();
  const [stationData, setStationData] = useState<StationDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [showSlide, setShowSlide] = useState(false);
  const [selectedMember, setSelectedMember] = useState<StationMember | null>(null);
  const [memberPositions, setMemberPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [, setIsDragging] = useState(false);
  const { userInfo } = useCharacterStore();

  const stationId = sessionStorage.getItem("stationId") as string;
  const currentUserId = userInfo.userId;

  useEffect(() => {
    if (stationData) {
      trackEvent("Station", "view_station_inside", { 
        owner_id: stationData.adminUserId // PM 요구사항: 주인 ID 포함
      });
    }
  }, [stationData]);

  const handleSettingClick = () => {
    setShowSlide(true);
  };

  const handleCustomClick = () => {
    navigate("/station/stationbackgroundsetting");
  };

  const handlePositionChange = (userId: string, x: number, y: number) => {
    setMemberPositions((prev) => ({
      ...prev,
      [userId]: { x, y },
    }));
  };

  const refreshStationData = async () => {
    if (!stationId) return;
    try {
        const response = await axiosRequest<StationDetails>(`/stations/${stationId}`, "GET", null);
        if (response) {
            setStationData(response.data);
        }
    } catch (err) {
        setError(err as Error);
    }
};

  const handleMemberClick = (member: StationMember) => {
    setSelectedMember(member);
  };

  const handleLeaveStation = () => {
    sessionStorage.removeItem("stationId");
    navigate("/station");
  };

  useEffect(() => {
      if (!stationId) {
          navigate("/station");
          return;
      }
  }, [stationId, navigate]);

  useEffect(() => {
    const getStationData = async () => {
      if (!stationId) return;
      try {
        setIsLoading(true);
        const response = await axiosRequest<StationDetails>(`/stations/${stationId}`, "GET", null);
        if (response) {
          setStationData(response.data);
          const initialPositions: Record<string, { x: number; y: number }> = {};
          response.data.stationMembers.forEach((member) => {
            initialPositions[member.userId] = {
              x: member.positionX,
              y: member.positionY,
            };
          });
          setMemberPositions(initialPositions);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };
    getStationData();
  }, [stationId]);

  if (isLoading) return <Pending />;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!stationData) return null;

  return (
    <div
      className={s.container}
      style={{
        backgroundImage: `url(${IMG_BASE_URL}background/${stationData.stationBackground})`,
      }}
    >
      <div className={s.dim} />
      {!stationData.reportWritten && (
        <StationReport
          stationId={stationId}
          onReportSubmitted={refreshStationData}
        />
      )}
      <div className={s.headerContainer}>
        <div className={s.backBtn}>
          <img src={backBtn} alt="뒤로가기" onClick={handleLeaveStation} />
        </div>
        <div className={s.header}>
          <h2>[ {stationData.name} ]</h2>
          <p>{stationData.intro}</p>
        </div>
        <div className={s.btnGroup}>
          <div className={s.customBtn} onClick={handleCustomClick}>
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
            <DraggableMember
              key={member.userId}
              member={member}
              position={
                memberPositions[member.userId] || {
                  x: member.positionX,
                  y: member.positionY,
                }
              }
              onPositionChange={handlePositionChange}
              onMemberClick={() => handleMemberClick(member)}
              onDragStateChange={setIsDragging}
            />
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
            profile={selectedMember.profile}
          />
        ))}
    </div>
  );
};

export default StationInside;