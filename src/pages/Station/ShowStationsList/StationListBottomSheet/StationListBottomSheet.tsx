import { useEffect, useState } from "react";
import { motion, useMotionValue, PanInfo } from "framer-motion";
import styles from "./StationListBottomSheet.module.scss";
import { Station } from "../../../../interfaces/Interfaces";

interface Props {
  station: Station;
  onEnter: (id: string) => void;
}

/* 상수 (비율) */
const HEADER_H = 40; // 헤더 높이(px)
const BAR_VH   = 9;  // BottomBar = 9dvh
const MIN_VH   = 10; // ⭐️ 펼친 상태 top = 10dvh

export default function StationListBottomSheet({ station, onEnter }: Props) {
  /* ---------- 뷰포트 높이 추적 ---------- */
  const [vh, setVh] = useState(window.innerHeight);
  useEffect(() => {
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* px로 환산 */
  const BAR_PX = (vh * BAR_VH) / 100;   // BottomBar 높이
  const MIN_Y  = (vh * MIN_VH) / 100;   // ⭐️ 10dvh → px

  /* 드래그 하한 = 헤더만 보이도록 */
  const MAX_Y  = vh - BAR_PX - HEADER_H;

  /* Motion value */
  const y = useMotionValue<number>(MAX_Y);

  /* 손 뗀 위치 그대로 두되, 범위 밖이면 클램프 */
  const handleDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const newY = Math.min(Math.max(info.point.y, MIN_Y), MAX_Y);
    y.set(newY);
  };

  return (
    <motion.div
      className={styles.wrapper}
      /* bottom 은 고정 9dvh, top 은 드래그 값 */
      style={{ top: y, bottom: `${BAR_VH}dvh` }}
      drag="y"
      dragConstraints={{ top: MIN_Y, bottom: MAX_Y }}
      onDragEnd={handleDragEnd}
    >
      <div className={styles.header}>
        <div className={styles.handle} />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{station.name}</h3>
        <p className={styles.sub}>
          현재 이용자 <strong>{station.numOfUsers}</strong> 명
        </p>
        <button className={styles.enterBtn} onClick={() => onEnter(station.stationId)}>
          입장하기
        </button>
      </div>
    </motion.div>
  );
}