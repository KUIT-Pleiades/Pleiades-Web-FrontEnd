import React from "react";
import s from "./CompleteCartModal.module.scss";
import closeBtn from "../../assets/btnImg/closeBtn.svg";
import { IMG_BASE_URL, getImagePathByType } from "../../functions/getImage";

interface CompleteCartModalProps {
  item: {
    id: number | null;
    name: string;
    description: string;
    price: number;
    type: string;
  };
  onConfirm: () => void;
  onCustom: () => void;
  onCancel: () => void;
}

const CompleteCartModal: React.FC<CompleteCartModalProps> = ({
  item,
  onConfirm,
  onCustom,
  onCancel,
}) => {
  if (!item || item.id === null) {
    return null;
  }

  return (
    <div className={s.modalOverlay}>
      <div className={s.modal}>
        <button className={s.cancelButton} onClick={onCancel}>
          <img src={closeBtn} alt="닫기" />
        </button>
        <div className={s.header}>구매를 완료했어요!</div>
        <div className={s.itemDescription}>{item.description}</div>
        <img
          src={`${IMG_BASE_URL}${getImagePathByType(item.name, item.type)}`}
          alt={item.name}
          className={s.itemImage}
        />
        <div className={s.modalButton}>
          <button className={s.confirmButton} onClick={onConfirm}>
            계속 구매하기
          </button>
          <button className={s.costomBtn} onClick={onCustom}>
            커스텀하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteCartModal;
