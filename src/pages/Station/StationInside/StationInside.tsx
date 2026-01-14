import { useState, useEffect, useCallback } from "react";
import { axiosRequest } from "../../../functions/axiosRequest";
import { useCharacterStore } from "../../../store/useCharacterStore";
import { useNavigate } from "react-router-dom";
import { StationDetails, StationMember } from "../../../interfaces/Interfaces";
import { useStationSocket } from "../../../hooks/queries/useStationSocket" // hooks 폴더에 파일 있는지 확인
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

const IMG_BASE_URL: string = import.meta.env.VITE_IMG_BASE_URL;

interface CharacterLock {
  isLocked: boolean;
  lockedBy: string | null;
}

const StationInside: React.FC = () => {
  const navigate = useNavigate();
  const [stationData, setStationData] = useState<StationDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [showSlide, setShowSlide] = useState(false);
  const [selectedMember, setSelectedMember] = useState<StationMember | null>(null);
  const [memberPositions, setMemberPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [characterLocks, setCharacterLocks] = useState<Record<string, CharacterLock>>({});
  const [_onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());
  const [, setIsDragging] = useState(false);
  const { userInfo } = useCharacterStore();

  const stationId = sessionStorage.getItem("stationId") as string;
  const currentUserId = userInfo.userId;

  // WebSocket 이벤트 핸들러
  const handleMemberMoved = useCallback((targetUserId: string, x: number, y: number) => {
    setMemberPositions((prev) => ({
      ...prev,
      [targetUserId]: { x, y },
    }));
  }, []);

  const handleMemberJoined = useCallback((userId: string) => {
    // 접속한 유저 온라인 표시
    setOnlineUsers((prev) => new Set([...prev, userId]));
  }, []);

  const handleMemberLeft = useCallback((userId: string) => {
    // 퇴장한 유저 오프라인 표시
    setOnlineUsers((prev) => {
      const updated = new Set(prev);
      updated.delete(userId);
      return updated;
    });
    // 해당 유저가 잠근 캐릭터 해제
    setCharacterLocks((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((key) => {
        if (updated[key].lockedBy === userId) {
          updated[key] = { isLocked: false, lockedBy: null };
        }
      });
      return updated;
    });
  }, []);

  const handleMemberAdded = useCallback((userId: string, x: number, y: number) => {
    // 새 멤버 위치 추가
    setMemberPositions((prev) => ({
      ...prev,
      [userId]: { x, y },
    }));
    // 멤버 정보 새로고침
    refreshStationData();
  }, []);

  const handleMemberRemoved = useCallback((userId: string) => {
    // 멤버 제거 시 목록에서 삭제
    setStationData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        stationMembers: prev.stationMembers.filter((m) => m.userId !== userId),
      };
    });
    setMemberPositions((prev) => {
      const updated = { ...prev };
      delete updated[userId];
      return updated;
    });
  }, []);

  const handleLockResult = useCallback((targetUserId: string, success: boolean, lockedBy?: string) => {
    if (!success && lockedBy) {
      alert(`${targetUserId} 캐릭터를 ${lockedBy}님이 이동 중입니다.`);
    }
  }, []);

  const handleCharacterLocked = useCallback((targetUserId: string, lockedBy: string) => {
    setCharacterLocks((prev) => ({
      ...prev,
      [targetUserId]: { isLocked: true, lockedBy },
    }));
  }, []);

  const handleCharacterUnlocked = useCallback((targetUserId: string) => {
    setCharacterLocks((prev) => ({
      ...prev,
      [targetUserId]: { isLocked: false, lockedBy: null },
    }));
  }, []);

  const handleInitialMembers = useCallback((members: { userId: string; x: number; y: number }[]) => {
    const positions: Record<string, { x: number; y: number }> = {};
    members.forEach((m) => {
      positions[m.userId] = { x: m.x, y: m.y };
    });
    setMemberPositions((prev) => ({ ...prev, ...positions }));
  }, []);

  // WebSocket 연결
  const { isConnected, dragStart, move, dragEnd } = useStationSocket({
    stationId,
    userId: currentUserId,
    onMemberMoved: handleMemberMoved,
    onMemberJoined: handleMemberJoined,
    onMemberLeft: handleMemberLeft,
    onMemberAdded: handleMemberAdded,
    onMemberRemoved: handleMemberRemoved,
    onLockResult: handleLockResult,
    onCharacterLocked: handleCharacterLocked,
    onCharacterUnlocked: handleCharacterUnlocked,
    onInitialMembers: handleInitialMembers,
  });

  const handleSettingClick = () => {
    setShowSlide(true);
  };

  const handleCustomClick = () => {
    navigate("/station/stationbackgroundsetting");
  };

  // 스테이션 데이터를 새로고침하는 함수
  const refreshStationData = async () => {
    if (!stationId) return;
    try {
      const response = await axiosRequest<StationDetails>(
        `/stations/${stationId}`,
        "GET",
        null
      );
      if (response) {
        setStationData(response.data);
      }
    } catch (err) {
      setError(err as Error);
    }
  };

  // 멤버 클릭 핸들러
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
        const response = await axiosRequest<StationDetails>(
          `/stations/${stationId}`,
          "GET",
          null
        );
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
        backgroundImage: `url(${IMG_BASE_URL}${stationData.stationBackground})`,
      }}
    >
      <div className={s.dim} />
      
      {/* 연결 상태 표시 (개발용, 필요시 제거) */}
      {!isConnected && (
        <div
          style={{
            position: "fixed",
            top: 10,
            right: 10,
            background: "rgba(255,0,0,0.8)",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "12px",
            zIndex: 1000,
          }}
        >
          연결 중...
        </div>
      )}

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
              isLocked={characterLocks[member.userId]?.isLocked || false}
              lockedBy={characterLocks[member.userId]?.lockedBy || null}
              onDragStart={dragStart}
              onMove={move}
              onDragEnd={dragEnd}
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