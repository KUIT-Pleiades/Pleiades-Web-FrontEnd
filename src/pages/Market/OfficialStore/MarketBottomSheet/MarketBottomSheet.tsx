import { useRef } from "react";
import { useDrag } from "@use-gesture/react";
import { motion, useMotionValue, animate } from "framer-motion";
import styles from "./MarketBottomSheet.module.scss";

// 스냅 포인트: [닫힘, 중간, 열림]
const SNAP_POINTS = [window.innerHeight - 120, window.innerHeight / 2, 100];
const DRAG_BUFFER = 30; // 상단 및 하단 경계에서 추가적인 드래그 여유 공간

export default function MarketBottomSheet() {
  // y축의 위치를 추적하는 모션 값. 초기값은 '닫힘' 상태.
  const y = useMotionValue(SNAP_POINTS[0]);

  // ✅ useRef에 타입을 명시하여 타입스크립트 에러를 해결합니다.
  const sheetRef = useRef<HTMLDivElement>(null);

  const bind = useDrag(
    ({ last, movement: [, my], velocity: [, vy] }) => {
      const currentY = y.get();

      // 드래그 중일 때 y값을 업데이트
      if (!last) {
        y.set(currentY + my);
        return;
      }

      // 드래그를 놓았을 때의 로직
      const projectedY = currentY + my + vy * 250; // 관성을 고려한 예상 위치

      // 가장 가까운 스냅 포인트를 찾음
      const closest = SNAP_POINTS.reduce((prev, curr) =>
        Math.abs(curr - projectedY) < Math.abs(prev - projectedY) ? curr : prev
      );

      // 스프링 애니메이션으로 가장 가까운 스냅 포인트로 이동
      animate(y, closest, {
        type: "spring",
        stiffness: 400,
        damping: 40,
      });
    },
    {
      // 드래그 시작점 설정
      from: () => [0, y.get()],
      // 드래그 경계 설정
      bounds: {
        top: SNAP_POINTS[SNAP_POINTS.length - 1] - DRAG_BUFFER,
        bottom: SNAP_POINTS[0] + DRAG_BUFFER,
      },
      // 수직축으로만 드래그 허용
      axis: "y",
      // 탭 동작이 드래그로 인식되지 않도록 필터링
      filterTaps: true,
    }
  );

  return (
    <motion.div
      ref={sheetRef}
      className={styles.sheet}
      style={{ y }} // y 모션 값을 직접 전달하여 transform을 제어
    >
      <div className={styles.handle} {...bind()} />
      <div className={styles.content}>
        <p>이곳에 콘텐츠를 넣으세요.</p>
        <p>스크롤 테스트를 위한 내용입니다.</p>
        {/* 콘텐츠가 길어지면 자동으로 스크롤됩니다. */}
        <div style={{ height: "1000px" }} />
      </div>
    </motion.div>
  );
}
