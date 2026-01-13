import React from "react";
import s from "./AddToCartModal.module.scss";
import stone from "../../assets/market/stone.svg";
import closeBtn from "../../assets/btnImg/closeBtn.svg";
import { IMG_BASE_URL, getImagePathByType } from "../../functions/getImage";

interface AddToCartModalProps {
  item: {
    id: number | null;
    name: string;
    description: string;
    price: number;
    type: string;
  };
  onConfirm: () => void;
  onCancel: () => void;
}

const AddToCartModal: React.FC<AddToCartModalProps> = ({
  item,
  onConfirm,
  onCancel,
}) => {
  if (!item || item.id === null) {
    return null;
  }

  return (
    <div className={s.modalOverlay}>
      <div className={s.modal}>
        <button
          className={`${s.modalButton} ${s.cancelButton}`}
          onClick={onCancel}
        >
          <img src={closeBtn} alt="닫기" />
        </button>
        <div className={s.itemDescription}>{item.description}</div>
        <img
          src={`${IMG_BASE_URL}${getImagePathByType(item.name, item.type)}`}
          alt={item.name}
          className={s.itemImage}
        />
        <div className={s.itemPrice}>
          <img src={stone} alt="stone" />
          <span>{item.price}</span>
        </div>

        <button
          className={`${s.modalButton} ${s.confirmButton}`}
          onClick={onConfirm}
        >
          구매하기
        </button>
      </div>
    </div>
  );
};

export default AddToCartModal;
