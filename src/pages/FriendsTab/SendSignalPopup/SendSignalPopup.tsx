import React from "react";
import s from "./SendSignalPopup.module.scss";

// image files
import close from '../../../assets/Signal/close.svg';
import outgoing1 from '../../../assets/Signal/발신_1.webp';
import outgoing2 from '../../../assets/Signal/발신_2.webp';
import outgoing3 from '../../../assets/Signal/발신_3.webp';

interface SendSignalPopupProps {
    username: string;
    handleCloseSendSignalPopup: () => void;
    imageIndex: number;
}

const SendSignalPopup: React.FC<SendSignalPopupProps> = ({
    username,
    handleCloseSendSignalPopup,
    imageIndex
}) => {
    const images = [outgoing1, outgoing2, outgoing3];

    return (
        <div className={s.modalOverlay}>
            <div className={s.modal}>
                <button
                    className={s.modalClose}
                    onClick={handleCloseSendSignalPopup}
                 >
                    <img src={close} alt="close" />
                </button>
                <div className={s.textArea}>
                    <span className={s.textTitle}>🚀 신호 발사 완료!</span>
                    <span className={s.textFirst}>{username}님이</span>
                    <span className={s.textSecond}>곧 포착할 거에요!</span>
                </div>
                <div className={s.imageContainer}>
                    <img
                        src={images[imageIndex]} // 선택된 이미지 표시
                        alt="outgoing"
                        className={s.outgoingImg}
                    />
                </div>
            </div>
        </div>
    );
};

export default SendSignalPopup;