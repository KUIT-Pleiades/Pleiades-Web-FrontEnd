import React, { useState, useEffect } from "react";
import s from "./SendSignalPopup.module.scss";

// image files
import close from '../../../assets/Signal/close.svg';
import outgoing1 from '../../../assets/Signal/발신_1.webp';
import outgoing2 from '../../../assets/Signal/발신_2.webp';
import outgoing3 from '../../../assets/Signal/발신_3.webp';

interface SendSignalPopupProps {
    username: string;
    isSendSignalPopupVisible: boolean;
    handleCloseSendSignalPopup: () => void;
    onImageSelected: (index: number) => void; // 선택된 이미지 인덱스를 부모로 전달
}

const SendSignalPopup: React.FC<SendSignalPopupProps> = ({
    username,
    isSendSignalPopupVisible,
    handleCloseSendSignalPopup,
    onImageSelected,
}) => {
    const images = [outgoing1, outgoing2, outgoing3];
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * images.length);
        setSelectedImageIndex(randomIndex);
        onImageSelected(randomIndex); // 부모 컴포넌트로 전달
    }, [isSendSignalPopupVisible]);

    return (
        <div className={s.modalOverlay}>
            <div className={s.modal}>
                <button className={s.modalClose}>
                    <img src={close} alt="close" onClick={handleCloseSendSignalPopup} />
                </button>
                <div className={s.textArea}>
                    <span className={s.textTitle}>🚀 신호 발사 완료!</span>
                    <span className={s.textFirst}>{username}님이</span>
                    <span className={s.textSecond}>곧 포착할 거에요!</span>
                </div>
                <div className={s.imageContainer}>
                    <img
                        src={images[selectedImageIndex]} // 선택된 이미지 표시
                        alt="outgoing"
                        className={s.outgoingImg}
                    />
                </div>
            </div>
        </div>
    );
};

export default SendSignalPopup;