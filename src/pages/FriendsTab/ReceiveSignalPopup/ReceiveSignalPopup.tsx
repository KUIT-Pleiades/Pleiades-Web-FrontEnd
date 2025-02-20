import React, { useState } from "react";
import s from "./ReceiveSignalPopup.module.scss";

// image files
import close from '../../../assets/Signal/close.svg';
import receive1 from '../../../assets/Signal/수신_1.webp';
import receive2 from '../../../assets/Signal/수신_2.webp';
import receive3 from '../../../assets/Signal/수신_3.webp';

interface ReceiveSignalPopupProps {
    username: string;
    handleCloseReceiveSignalPopup: () => void;
    imageIndex: number;
}

const ReceiveSignalPopup: React.FC<ReceiveSignalPopupProps> = ({
    username,
    handleCloseReceiveSignalPopup,
    imageIndex
}) => {
    const [isClosing, setIsClosing] = useState(false);

    const images = [receive1, receive2, receive3];
    const sentences1 = ["⚡️찌릿!", "🚀우주에서", "🔔띠링!"];
    const sentences2 = ["님이 보낸 신호를", "님이 보낸 신호가", "님의 신호를 받았어요."];
    const sentences3 = ["우주에서 포착!", "도착했어요!", "응답해볼까요?"];

    const handleModalClose = () => {
        // 애니메이션 효과 적용을 위해 isClosing 상태 변경
        setIsClosing(true);
        // 애니메이션 지속 시간(300ms) 후 부모의 핸들러 호출
        setTimeout(() => {
            handleCloseReceiveSignalPopup();
            setIsClosing(false);
        }, 300);
    };

    return (
        <div className={s.modalOverlay}>
            <div className={`${s.modal} ${isClosing ? s.fadeOut : ''}`}>
                <button
                    className={s.modalClose}
                    onClick={handleModalClose}
                >
                    <img src={close} alt="close" />
                </button>
                <div className={s.textArea}>
                    <span className={s.textTitle}>{sentences1[imageIndex]}</span>
                    <span className={s.textFirst}>{username}{sentences2[imageIndex]}</span>
                    <span className={s.textSecond}>{sentences3[imageIndex]}</span>
                </div>
                <div className={s.imageContainer}>
                    <img
                        src={images[imageIndex]} // 선택된 이미지 표시
                        alt="receive"
                        className={s.receiveImg}
                    />
                </div>
            </div>
        </div>
    );
};

export default ReceiveSignalPopup;