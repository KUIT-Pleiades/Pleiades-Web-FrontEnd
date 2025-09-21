import React from "react";
import s from "./SellItemModal.module.scss";

// image files
import close from '../../../../assets/Signal/close.svg';
import stone from "../../../../assets/market/stone.svg";

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
                    <span className={s.itemNameText}>{itemName}</span>
                </div>
                <div className={s.imageContainer}>
                    <img
                        src={image}
                        alt="item image"
                        className={s.itemImg}
                    />
                </div>
                <div className={s.priceArea}>
                    <span className={s.priceText}>공식몰 가격</span>
                    <img src={stone} alt="stone" className={s.stoneIcon} />
                    <span className={s.priceValue}>15</span>
                </div>
                <div className={s.buttonArea}>
                    <div
                        className={s.checkMarketPriceBtn}
                        onClick={() => {}}
                    >
                        <span className={s.btnText}>시세확인</span>
                    </div>
                    <div
                        className={s.sellBtn}
                        onClick={() => {}}
                    >
                        <span className={s.btnText}>판매하기</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SellItemModal;