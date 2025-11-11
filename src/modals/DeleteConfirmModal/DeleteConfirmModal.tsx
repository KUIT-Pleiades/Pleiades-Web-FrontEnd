import React from "react";
import s from "./DeleteConfirmModal.module.scss";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "판매 중인 게시글을 삭제할까요?",
}) => {
  if (!isOpen) return null;

  return (
    <div className={s.deleteModalOverlay}>
      <div className={s.deleteModal}>
        <p className={s.deleteModalTitle}>{title}</p>
        <div className={s.deleteModalButtons}>
          <button className={s.deleteCancelBtn} onClick={onClose}>
            취소
          </button>
          <button className={s.deleteConfirmBtn} onClick={onConfirm}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
