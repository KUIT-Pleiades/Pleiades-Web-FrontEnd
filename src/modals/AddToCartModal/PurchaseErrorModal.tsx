import React from "react";
import s from "./PurchaseErrorModal.module.scss";
import closeBtn from "../../assets/btnImg/closeBtn.svg";

interface PurchaseErrorModalProps {
  message: string;
  onClose: () => void;
}

const PurchaseErrorModal: React.FC<PurchaseErrorModalProps> = ({
  message,
  onClose,
}) => {
  return (
    <div className={s.modalOverlay}>
      <div className={s.modal}>
        <button className={s.closeButton} onClick={onClose}>
          <img src={closeBtn} alt="닫기" />
        </button>
        <div className={s.errorMessage}>{message}</div>
        <button className={s.confirmButton} onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  );
};

export default PurchaseErrorModal;
