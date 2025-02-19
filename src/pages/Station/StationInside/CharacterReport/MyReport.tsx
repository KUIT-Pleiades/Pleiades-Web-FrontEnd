import React from "react";
import s from "./CharacterReport.module.scss";
import messageIcon from "../../../../assets/Icon/message.svg";

interface ReportProps {
  onClose: () => void;
  stationId: string;
  userId: string;
}

const MyReport: React.FC<ReportProps> = ( {onClose} ) => {
  return (
    <div className={s.container}>
      <div className={s.overlay}>
        <div className={s.modal}>
          <div className={s.modalHeader}>
            <div className={s.modalQuestion}>
              <img
                src={messageIcon}
                alt="메세지 아이콘"
                className={s.messageIcon}
              />
              <div className={s.modalContent}>
                <div className={s.question}></div>
								<div className={s.date}>날짜</div>
								<div onClick={onClose}>닫기</div>
              </div>
            </div>
          </div>
          <div className={s.modalBody}>
            <div className={s.editWrapper}>내용</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReport;
