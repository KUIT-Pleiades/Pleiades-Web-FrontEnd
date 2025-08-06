import React, { useRef, useState, useEffect } from "react";
import styles from "./DraggableBottomSheet.module.scss";

type DraggableBottomSheetProps = {
    open: boolean;
    onClose: () => void;
    onOpen: () => void; // 부모 컴포넌트에서 open을 true로 바꿔줘야 함
    children: React.ReactNode;
    maxHeightRatio?: number; // 0~1, default 0.8
    headerHeight?: number;   // 헤더 높이(px), default 40
    dragThreshold?: number;  // 드래그로 열고 닫히는 최소 거리(px), default 20
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

    // 바텀시트 열림/닫힘 상태에 따라 높이 조정
    useEffect(() => {
        console.log("now is" + (open ? " open" : " closed"));
        if (open) {
            setHeight(maxHeight);
            console.log("set max height 1");
            setAnimating(true);
            document.body.style.overflow = "hidden";
        } else {
            setHeight(minHeight);
            setAnimating(true);
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [open, maxHeight, minHeight]);

    // 드래그 시작
    const onDragStart = (clientY: number) => {
        setIsDragging(true);
        setAnimating(false);
        startY.current = clientY;
        startHeight.current = height;
        dragDelta.current = 0;
        clickPrevented.current = false;
        console.log("Drag Start");
    };

    // 드래그 중
    const onDragMove = (clientY: number) => {
        if (!isDragging) return;
        const delta = startY.current - clientY;
        dragDelta.current = delta;
        if (Math.abs(delta) >= 5) {
            clickPrevented.current = true; // 손가락이 움직였으면 클릭 아님!
        }
        let newHeight = startHeight.current + delta;
        if (newHeight > maxHeight) newHeight = maxHeight;
        if (newHeight < minHeight) newHeight = minHeight;
        setHeight(newHeight);
    };

    // 드래그 끝
    const onDragEnd = () => {
        setIsDragging(false);
        setAnimating(true);
        console.log("Drag End");
        console.log("Drag Delta:", dragDelta.current);
        console.log("now is" + (open ? " open" : " closed"));
        if (open) {
            // 열려있을 때: 아래로 dragThreshold 이상 내리면 닫힘
            if (dragDelta.current < -dragThreshold) {
                console.log("열려있을 때: 아래로 dragThreshold 이상 내리면 닫힘");
                setHeight(minHeight);
                setTimeout(onClose, 300);
                return;
            } 
            if (dragDelta.current >= -dragThreshold) {
                console.log("열려있을 때: 아래로 dragThreshold 이하로 움직이면 그대로 유지");
                setHeight(maxHeight);
                return;
            }
            // 열려있을 때: 위로 dragThreshold 이하로 움직이면 그대로 유지
            if (height > maxHeight - dragThreshold) {
                console.log("열려있을 때: 위로 dragThreshold 이하로 움직이면 그대로 유지");
                setHeight(maxHeight);
                return;
            }
            // 열려있을 때: 밑에서 dragThreshold보다 낮게 있으면 닫힘
            if (height < minHeight + dragThreshold) {
                console.log("열려있을 때: 밑에서 dragThreshold보다 낮게 있으면 닫힘");
                setHeight(minHeight);
                setTimeout(onClose, 300);
                return;
            }
        } else {
            // 닫혀있을 때: 위로 dragThreshold 이상 올리면 열림
            if (dragDelta.current > dragThreshold) {
                console.log("닫혀있을 때: 위로 dragThreshold 이상 올리면 열림");
                setHeight(maxHeight);
                setTimeout(() => onOpen(), 0); // 상태 전이 후 실행되도록 defer
                return;
            } else {
                // 닫혀있을 때: 아래로 dragThreshold 이하로 움직이면 그대로 유지
                console.log("닫혀있을 때: 아래로 dragThreshold 이하로 움직이면 그대로 유지");
                setHeight(minHeight);
                onClose();
                return;
            }
        }
    };

    // 마우스/터치 이벤트 핸들러
    useEffect(() => {
        if (!isDragging) return;

        const handleMouseMove = (e: MouseEvent) => {
            onDragMove(e.clientY);
        };
        const handleMouseUp = () => {
            onDragEnd();
        };
        const handleTouchMove = (e: TouchEvent) => {
            onDragMove(e.touches[0].clientY);
        };
        const handleTouchEnd = () => {
            onDragEnd();
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("touchmove", handleTouchMove);
        window.addEventListener("touchend", handleTouchEnd);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
        };
        // eslint-disable-next-line
    }, [isDragging, height, maxHeight, minHeight, open]);

    // overlay는 바텀시트가 완전히 올라왔을 때만 보이게
    const showOverlay = height > minHeight + 20;

    const hideHeaderDim = height > minHeight + 20;
    // headerDim opacity 계산
    const fadeStart = minHeight + 20;
    const fadeEnd = minHeight + 60;
    const fadeRange = fadeEnd - fadeStart;

    const dimOpacity =
        height <= fadeStart
        ? 1.0
        : height >= fadeEnd
        ? 0.0
        : 1 - (height - fadeStart) / fadeRange;

    // 헤더 클릭 시 열기/닫기
    const handleHeaderClick = () => {
        console.log("헤더 클릭");
        setAnimating(true);
        if (open) {
            setHeight(minHeight);
            setTimeout(onClose, 300);
        } else {
            onOpen();
        }
    };

    // 바텀시트가 완전히 닫힌 상태
    if (!open && height === minHeight) {
        return (
            <div
                className={styles.sheet}
                style={{
                    height: minHeight,
                    maxHeight,
                    transition: animating ? undefined : "none",
                }}
            >
                <div
                    className={`${styles.header} ${!hideHeaderDim ? styles.headerClosed : ""}`}
                    onMouseDown={e => onDragStart(e.clientY)}
                    onTouchStart={e => onDragStart(e.touches[0].clientY)}
                    onClick={handleHeaderClick}
                    style={{ height: `${headerHeight}px` }}
                >
                    {!hideHeaderDim && (
                        <div
                            className={styles.headerDim}
                            style={{ opacity: dimOpacity }}
                        />
                    )}
                    <div className={styles.dragHandle} />
                    <h2 className={styles.handleText}>내 정거장 목록</h2>
                </div>
            </div>
        );
    }

    // 바텀시트가 열려있을 때
    return (
        <>
            <div
                className={`${styles.overlay} ${showOverlay ? styles.overlayShown : ""}`}
                onClick={() => {
                    setHeight(minHeight);
                    setAnimating(true);
                    setTimeout(onClose, 300);
                }}
            />
            <div
            className={styles.sheet}
            style={{
                height,
                maxHeight,
                transition: animating ? undefined : "none",
            }}
            >
                <div
                    className={`${styles.header} ${!hideHeaderDim ? styles.headerClosed : ""}`}
                    onMouseDown={e => onDragStart(e.clientY)}
                    onTouchStart={e => onDragStart(e.touches[0].clientY)}
                    onClick={() => {
                        if (clickPrevented.current) {
                            console.log("클릭 아님: 드래그");
                            return;
                        }
                        handleHeaderClick();
                    }}
                    style={{ height: `${headerHeight}px` }}
                >
                    {!hideHeaderDim && (
                        <div
                            className={styles.headerDim}
                            style={{ opacity: dimOpacity }}
                        />
                    )}
                    <div className={styles.dragHandle} />
                    <h2 className={styles.handleText}>내 정거장 목록</h2>
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </>
    );
};