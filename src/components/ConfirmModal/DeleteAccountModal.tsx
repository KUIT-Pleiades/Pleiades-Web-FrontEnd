import React from "react";
import s from "./ConfirmModal.module.scss";

interface DeleteAccountModalProps {
  userId: string;
  profile: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  userId,
  profile,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className={s.modalOverlay}>
      <div className={s.modal}>
        <div className={s.modalAvatar}>
          <img src={profile} alt={"avatar"} className={s.modalAvatarImage} />
        </div>
        <div className={s.modalUserId}>(@{userId})</div>
        <p className={s.modalMessageHeader}>정말 플아데를 떠나시겠습니까?</p>
        <p className={s.modalMessage}>
          회원 탈퇴 시 우리의 소중한 기록이 모두 지워져요 😭
          <br />
          삭제된 계정 정보는 다시 복구되지 않습니다.
        </p>
        <div className={s.modalButtons}>
          <button className={s.modalButtonsDelete} onClick={onConfirm}>
            탈퇴하기
          </button>
          <button className={s.modalButtonsCancel} onClick={onCancel}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
