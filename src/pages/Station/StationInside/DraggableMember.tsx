import React, { useEffect, useState } from "react";
import { useDrag } from "@use-gesture/react";
import messageBtn from "../../../assets/btnImg/messageBtn.svg";
import s from "./StationInside.module.scss";

interface DraggableMemberProps {
  member: {
    userId: string;
    userName: string;
    character: string;
    todayReport: boolean;
  };
  position: { x: number; y: number };
  isLocked: boolean;
  lockedBy: string | null;
  onDragStart: (userId: string) => void;
  onMove: (userId: string, x: number, y: number) => void;
  onDragEnd: (userId: string) => void;
  onMemberClick: () => void;
  onDragStateChange: (isDragging: boolean) => void;
}

const DraggableMember: React.FC<DraggableMemberProps> = ({
  member,
  position,
  isLocked,
  lockedBy,
  onDragStart,
  onMove,
  onDragEnd,
  onMemberClick,
  onDragStateChange,
}) => {
  const [localPosition, setLocalPosition] = useState(position);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPosition, setDragStartPosition] = useState(position);
  const [hasLock, setHasLock] = useState(false);

  // 부모로부터 전달되는 position이 바뀌면 로컬 상태를 동기화
  useEffect(() => {
    if (!isDragging) {
      setLocalPosition(position);
      setDragStartPosition(position);
    }
  }, [position, isDragging]);

  const bind = useDrag(
    ({ down, movement: [mx, my], tap, event, first, last }) => {
      event?.preventDefault();
      
      if (tap && member.todayReport) {
        onMemberClick();
        return;
      }

      // 다른 사람이 잠금 중이면 드래그 불가
      if (isLocked && !hasLock) {
        return;
      }

      if (first) {
        // 드래그 시작 시 잠금 요청
        setDragStartPosition(localPosition);
        onDragStart(member.userId);
        setHasLock(true);
      }

      if (down && hasLock) {
        setIsDragging(true);
        onDragStateChange(true);
        
        const newX = dragStartPosition.x + (mx / window.innerWidth) * 100;
        const newY = dragStartPosition.y + (my / window.innerHeight) * 100;
        
        const clampedX = Math.max(0, Math.min(70, newX));
        const clampedY = Math.max(10, Math.min(80, newY));
        
        setLocalPosition({ x: clampedX, y: clampedY });
        
        // 서버로 위치 전송
        onMove(member.userId, clampedX, clampedY);
      }
      
      if (last && hasLock) {
        setIsDragging(false);
        onDragStateChange(false);
        setHasLock(false);
        
        // 드래그 종료
        onDragEnd(member.userId);
      }
    },
    {
      filterTaps: true,
      pointer: { touch: true },
      preventDefault: true,
    }
  );

  return (
    <div
      className={s.memberItem}
      style={{
        position: "fixed",
        left: `${localPosition.x}dvw`,
        top: `${localPosition.y}dvh`,
        width: "30dvw",
        cursor: isLocked && !hasLock ? "not-allowed" : isDragging ? "grabbing" : "grab",
        touchAction: "none",
        zIndex: isDragging ? 200 : 1,
        opacity: isLocked && !hasLock ? 0.7 : 1,
      }}
    >
      <img
        {...bind()}
        src={member.character}
        alt=""
        draggable={false}
        style={{
          width: "100%",
          userSelect: "none",
          pointerEvents: "auto",
        }}
      />
      {/* 잠금 표시 */}
      {isLocked && lockedBy && (
        <div
          style={{
            position: "absolute",
            top: "-20px",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "12px",
            background: "rgba(0,0,0,0.7)",
            color: "white",
            padding: "2px 8px",
            borderRadius: "4px",
            whiteSpace: "nowrap",
          }}
        >
          {lockedBy} 이동 중
        </div>
      )}
      {member.todayReport && (
        <div
          className={s.messageIcon}
          style={{
            position: "absolute",
            left: `${20}dvw`,
            top: `${2}dvh`,
            zIndex: 100,
            pointerEvents: member.todayReport && !isDragging ? "auto" : "none",
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (!isDragging) {
              onMemberClick();
            }
          }}
        >
          <img
            src={messageBtn}
            alt="리포트"
            draggable={false}
            style={{
              height: "7dvw",
              userSelect: "none",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DraggableMember;