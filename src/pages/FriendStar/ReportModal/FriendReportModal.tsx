import s from "./ReportModal.module.scss";
import messageIcon from "../../../assets/Icon/message.svg";
import closeBtn from "../../../assets/btnImg/closeBtn.svg";
import { formatDateTime } from "../../../functions/formatDateTime";

interface Report {
  reportId: number;
  questionId: number;
  question: string;
  createdAt: string;
  modifiedAt: string;
  answer: string;
  isTodayReport: boolean;
}

interface ReportModalProps {
  report: Report;
  onClose: () => void;
}

const FriendReportModal = ({
  report,
  onClose,
}: ReportModalProps) => {
	

  return (
    <div className={s.modalOverlay} onClick={onClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <div className={s.modalHeader}>
          <div className={s.modalQuestion}>
            <img
              src={messageIcon}
              alt="메세지 아이콘"
              className={s.messageIcon}
            />
            <div className={s.modalContent}>
              <div className={s.question}>{report.question}</div>
              <div className={s.date}>
                {new Date(report.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          <button className={s.closeButton} onClick={onClose}>
            <img src={closeBtn} alt="" />
          </button>
        </div>
        <div className={s.modalBody}>
          <div className={s.infoWrapper}>
            <div className={s.modifedAt}>
              {formatDateTime(report.modifiedAt)}
            </div>
          </div>
          
            <div className={s.answer}>{report.answer}</div>
          
        </div>
      </div>
    </div>
  );
};

export default FriendReportModal;
