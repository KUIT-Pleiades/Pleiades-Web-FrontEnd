import React from "react";
import s from "./DeleteConfirmModal.module.scss";
import garbageIcon from "../../assets/Icon/garbageIcon.svg";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "판매 중인 게시글을 삭제할까요?",
  description = "삭제하면 해당 아이템 판매가 중단돼요.",
}) => {
  if (!isOpen) return null;

  return (
    <div className={s.deleteModalOverlay}>
      <div className={s.deleteModalWrapper}>
        <div className={s.deleteIconWrapper}>
          <img src={garbageIcon} alt="Delete Icon" className={s.deleteIcon} />
        </div>

        <div className={s.deleteModal}>
          <div className={s.deleteModalContent}>
            <p className={s.deleteModalTitle}>{title}</p>
            <p className={s.deleteModalDescription}>{description}</p>
          </div>

          <div className={s.deleteModalButtons}>
            <button className={s.deleteBtn} onClick={onConfirm}>
              삭제할래요
            </button>
            <button className={s.cancelBtn} onClick={onClose}>
              취소할래요
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
