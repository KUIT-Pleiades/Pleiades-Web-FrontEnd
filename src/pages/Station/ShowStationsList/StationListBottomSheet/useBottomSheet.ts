import { useRef, useState, useEffect } from 'react';

const MIN_Y = 60;                                // 완전히 열린 위치
const MAX_Y = window.innerHeight - 60;           // 완전히 닫힌 위치

export default function useBottomSheet() {
  const sheetRef   = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  /* resize 대응 */
  useEffect(() => {
    const handleResize = () => {
      sheetRef.current!.style.top = isOpen ? `${MIN_Y}px` : `${MAX_Y}px`;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  /* 간단 토글 함수 (헤더·외부에서 사용) */
  const openSheet  = () => setIsOpen(true);
  const closeSheet = () => setIsOpen(false);

  return { sheetRef, contentRef, isOpen, openSheet, closeSheet };
}