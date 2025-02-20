import React from "react";
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
    const images = [receive1, receive2, receive3];

    return (
        <div className={s.modalOverlay}>
            <div className={s.modal}>
                <button
                    className={s.modalClose}
                    onClick={handleCloseReceiveSignalPopup}
                >
                    <img src={close} alt="close" />
                </button>
                <div className={s.textArea}>
                    <span className={s.textTitle}>⚡️찌릿</span>
                    <span className={s.textFirst}>{username}님이 보낸 신호를</span>
                    <span className={s.textSecond}>우주에서 포착!</span>
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