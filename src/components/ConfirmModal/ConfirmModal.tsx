
import React from "react";
import s from './ConfirmModal.module.scss';

interface ConfirmModalProps {
	userId: string;
	profile: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ userId, profile, message, onConfirm, onCancel }) => {
  return (
    <div className={s.modalOverlay}>
      <div className={s.modal}>
        <div className={s.modalAvatar}>
          <img
            src={profile}
            alt={"avatar"}
            className={s.modalAvatarImage}
          />
        </div>
        <div className={s.modalUserId}>(@{userId})</div>
				<p className={s.modalMessage}>{message}</p>
        <div className={s.modalButtons}>
          <button className={s.modalButtonsDelete} onClick={onConfirm}>
            확인
          </button>
          <button className={s.modalButtonsCancel} onClick={onCancel}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
