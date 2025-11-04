// File: src/components/Toast/useToast.tsx
import { useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Toast from './Toast';

// [add] 공용 토스트 훅 (.tsx 확장자 필수: JSX 사용)
export function useToast(durationMs: number = 1500) {
    const [message, setMessage] = useState<string>('');
    const [visible, setVisible] = useState<boolean>(false);
    const [showIcon, setShowIcon] = useState<boolean>(false);
    const timerRef = useRef<number | null>(null);

    // [change] 메시지 + 아이콘 여부를 함께 설정
    const showToast = useCallback((msg: string, withIcon: boolean = false) => {
        setMessage(msg);
        setShowIcon(withIcon);
        setVisible(true);

        if (timerRef.current) {
            window.clearTimeout(timerRef.current);
        }
        timerRef.current = window.setTimeout(() => {
            setVisible(false);
            timerRef.current = null;
        }, durationMs);
    }, [durationMs]);

    // [change] 포털로 바디에 렌더
    const ToastContainer = useCallback((): JSX.Element | null => {
        if (!visible) return null;
        return createPortal(
            <Toast message={message} showIcon={showIcon} />,
            document.body
        );
    }, [message, visible, showIcon]);

    return { showToast, ToastContainer };
}

export default useToast;