import React, { useRef, useState, useEffect } from "react";
import styles from "./DraggableBottomSheet.module.scss";

type DraggableBottomSheetProps = {
    open: boolean;
    onClose: () => void;
    onOpen: () => void;
    children: React.ReactNode;
    maxHeightRatio?: number;
    headerHeight?: number;
    dragThreshold?: number;
};

export const DraggableBottomSheet: React.FC<DraggableBottomSheetProps> = ({
    open,
    onClose,
    onOpen,
    children,
    maxHeightRatio = 0.7,
    headerHeight = 59,
    dragThreshold = 30,
}) => {
    const windowHeight = typeof window !== "undefined" ? window.innerHeight : 800;
    const maxHeight = windowHeight * maxHeightRatio;
    const minHeight = headerHeight;

    const [height, setHeight] = useState(open ? maxHeight : minHeight);
    const [isDragging, setIsDragging] = useState(false);
    const [animating, setAnimating] = useState(false);

    const startY = useRef(0);
    const startHeight = useRef(0);
    const dragDelta = useRef(0);
    const clickPrevented = useRef(false);

    // 외부에서 open 상태가 바뀔 때만 높이 동기화 (드래그 중에는 무시)
    useEffect(() => {
        if (isDragging) return;
        
        setAnimating(true);
        if (open) {
            setHeight(maxHeight);
            document.body.style.overflow = "hidden";
        } else {
            setHeight(minHeight);
            document.body.style.overflow = "";
        }
    }, [open, maxHeight, minHeight, isDragging]);

    const onDragStart = (clientY: number) => {
        setIsDragging(true);
        setAnimating(false); // 드래그 시에는 트랜지션 제거
        startY.current = clientY;
        startHeight.current = height;
        dragDelta.current = 0;
        clickPrevented.current = false;
    };

    const onDragMove = (clientY: number) => {
        if (!isDragging) return;
        const delta = startY.current - clientY;
        dragDelta.current = delta;
        
        if (Math.abs(delta) > 5) clickPrevented.current = true;

        let newHeight = startHeight.current + delta;
        // 범위 제한
        if (newHeight > maxHeight) newHeight = maxHeight + (newHeight - maxHeight) * 0.2; // 저항감
        if (newHeight < minHeight) newHeight = minHeight - (minHeight - newHeight) * 0.2;
        
        setHeight(newHeight);
    };

    const onDragEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);
        setAnimating(true);

        // 드래그 방향과 거리에 따른 최종 상태 결정
        if (open) {
            // 열린 상태에서 아래로 일정 이상 내리면 닫기
            if (dragDelta.current < -dragThreshold) {
                setHeight(minHeight);
                onClose();
            } else {
                setHeight(maxHeight);
            }
        } else {
            // 닫힌 상태에서 위로 일정 이상 올리면 열기
            if (dragDelta.current > dragThreshold) {
                setHeight(maxHeight);
                onOpen();
            } else {
                setHeight(minHeight);
            }
        }
    };

    useEffect(() => {
        if (!isDragging) return;

        const handleMove = (e: MouseEvent | TouchEvent) => {
            const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
            onDragMove(clientY);
        };
        const handleEnd = () => onDragEnd();

        window.addEventListener("mousemove", handleMove);
        window.addEventListener("mouseup", handleEnd);
        window.addEventListener("touchmove", handleMove, { passive: false });
        window.addEventListener("touchend", handleEnd);

        return () => {
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("mouseup", handleEnd);
            window.removeEventListener("touchmove", handleMove);
            window.removeEventListener("touchend", handleEnd);
        };
    }, [isDragging, height]);

    // UI 계산
    const showOverlay = height > minHeight + 10;
    const dimOpacity = Math.max(0, 1 - (height - minHeight) / 50);

    return (
        <>
            <div
                className={`${styles.overlay} ${showOverlay ? styles.overlayShown : ""}`}
                onClick={() => {
                    setAnimating(true);
                    setHeight(minHeight);
                    onClose();
                }}
            />
            <div
                className={styles.sheet}
                style={{
                    height: `${height}px`,
                    transition: animating ? "height 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)" : "none",
                }}
            >
                <div
                    className={styles.header}
                    onMouseDown={(e) => onDragStart(e.clientY)}
                    onTouchStart={(e) => onDragStart(e.touches[0].clientY)}
                    onClick={() => {
                        if (!clickPrevented.current) {
                            if (open) { onClose(); setHeight(minHeight); }
                            else onOpen();
                        }
                    }}
                    style={{ height: `${headerHeight}px` }}
                >
                    <div className={styles.headerDim} style={{ opacity: dimOpacity }} />
                    <div className={styles.dragHandle} />
                    <h2 className={styles.handleText}>내 정거장 목록</h2>
                </div>
                <div className={styles.content} style={{ opacity: open || height > minHeight + 50 ? 1 : 0 }}>
                    {children}
                </div>
            </div>
        </>
    );
};