import React from "react";
import s from "./SellItemModal.module.scss";

// image files
import close from '../../../../assets/Signal/close.svg';

interface SellItemModalProps {
    itemName: string;
    handleCloseSendSignalPopup: () => void;
    image: string;
}

const SellItemModal: React.FC<SellItemModalProps> = ({
    itemName,
    handleCloseSendSignalPopup,
    image
}) => {
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
                    {/* [CHANGED] 팀원 구조: description을 제목처럼 노출 */}
                    <span className={s.itemNameText}>{itemName}</span> {/* [CHANGED] */}
                </div>
                <div className={s.imageContainer}>
                    <img
                        src={image} // [CHANGED] IMG_BASE_URL+name 형태로 상위에서 완성된 URL 전달
                        alt="item image"
                        className={s.itemImg}
                    />
                </div>
            </div>
        </div>
    );
};

export default SellItemModal;