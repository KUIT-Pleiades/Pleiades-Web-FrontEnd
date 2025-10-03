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
  onPositionChange: (userId: string, x: number, y: number) => void;
  onMemberClick: () => void;
  onDragStateChange: (isDragging: boolean) => void;
}

const DraggableMember: React.FC<DraggableMemberProps> = ({
  member,
  position,
  onPositionChange,
  onMemberClick,
  onDragStateChange,
}) => {
  const [localPosition, setLocalPosition] = useState(position);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPosition, setDragStartPosition] = useState(position);

  // 부모로부터 전달되는 position이 바뀌면 로컬 상태를 동기화
  useEffect(() => {
    setLocalPosition(position);
    setDragStartPosition(position);
  }, [position]);

  const bind = useDrag(
    ({ down, movement: [mx, my], tap, event, first }) => {
      event?.preventDefault();
      
      if (tap && member.todayReport) {
        onMemberClick();
        return;
      }

      if (first) {
        // 드래그 시작 시 현재 위치를 저장
        setDragStartPosition(localPosition);
      }

      if (down) {
        setIsDragging(true);
        onDragStateChange(true);
        
        // 드래그 시작 위치를 기준으로 이동량 계산
        const newX = dragStartPosition.x + (mx / window.innerWidth) * 100;
        const newY = dragStartPosition.y + (my / window.innerHeight) * 100;
        
        const clampedX = Math.max(0, Math.min(70, newX));
        const clampedY = Math.max(10, Math.min(80, newY));
        
        setLocalPosition({ x: clampedX, y: clampedY });
      } else {
        // 드래그 종료 시 최종 위치를 부모에게 전달
        setIsDragging(false);
        onDragStateChange(false);
        
        const finalX = dragStartPosition.x + (mx / window.innerWidth) * 100;
        const finalY = dragStartPosition.y + (my / window.innerHeight) * 100;
        
        const clampedX = Math.max(0, Math.min(70, finalX));
        const clampedY = Math.max(10, Math.min(80, finalY));
        
        onPositionChange(member.userId, clampedX, clampedY);
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
        cursor: isDragging ? "grabbing" : "grab",
        touchAction: "none",
        zIndex: isDragging ? 200 : 1,
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