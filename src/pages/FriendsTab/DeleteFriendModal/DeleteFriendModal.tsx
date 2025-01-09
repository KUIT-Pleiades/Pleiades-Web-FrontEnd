import React from "react";
import s from './DeleteFriendModal.module.scss';

interface ModalProps {
    username: string;
    onClose: () => void;
    onDelete: () => void;
}

const DeleteFriendModal: React.FC<ModalProps> = ({
    username,
    onClose,
    onDelete,
}) => {

  return (
    <div className={s.modalOverlay}>
        <div className={s.modal}>
            <p className={s.modalMessageTitle}>친구 삭제</p>
            <p className={s.modalMessage}>{username}님을 삭제할까요?</p>
            <div className={s.modalButtons}>
                <button className={s.modalButtonsDelete} onClick={onDelete}>
                삭제할래요
                </button>
                <button className={s.modalButtonsCancel} onClick={onClose}>
                취소할래요
                </button>
            </div>
        </div>
    </div>
  );
};

export default DeleteFriendModal;