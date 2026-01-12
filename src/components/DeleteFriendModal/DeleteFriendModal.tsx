import React from "react";
import s from './DeleteFriendModal.module.scss';

interface ModalProps {
    username: string;
    userId: string;
    onClose: () => void;
    onDelete: () => void;
    profile: string;
}

const DeleteFriendModal: React.FC<ModalProps> = ({
    username,
    userId,
    onClose,
    onDelete,
    profile
}) => {

  return (
    <div className={s.modalOverlay}>
        <div className={s.modal}>
            <div className={s.modalAvatar}>
                <img src={profile} alt={`${username}'s avatar`} className={s.modalAvatarImage}/>
            </div>
            <div className={s.modalUserId}>(@{userId})</div>
            <p className={s.modalMessage}>{username}님을 친구에서 삭제할까요?</p>
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