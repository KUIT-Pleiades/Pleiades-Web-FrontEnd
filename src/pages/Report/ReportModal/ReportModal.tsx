// ReportModal.tsx
import s from "./ReportModal.module.scss";
import messageIcon from "../../../assets/Icon/message.svg";
import closeBtn from "../../../assets/btnImg/closeBtn.svg"
import { useState } from "react";

interface Report {
  reportId: number;
  questionId: number;
  question: string;
  createdAt: string;
  modifiedAt: string;
  answer: string;
}

interface ReportModalProps {
  report: Report;
  onClose: () => void;
  onUpdate: (reportId: number, newAnswer: string) => void;
}

const ReportModal = ({ report, onClose, onUpdate }: ReportModalProps) => {

	const [isEditing, setIsEditing] = useState(false);
  const [editedAnswer, setEditedAnswer] = useState(report.answer);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(report.reportId, editedAnswer); // 수정된 내용 저장
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedAnswer(report.answer);
    setIsEditing(false);
  };

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
            <div className={s.modifedAt}>{report.modifiedAt}</div>
            <div className={s.btnGroup}>
              {isEditing ? (
                <>
                  <button className={s.saveBtn} onClick={handleSave}>
                    저장
                  </button>
                  <span className={s.divider}>|</span>
                  <button className={s.cancelBtn} onClick={handleCancel}>
                    취소
                  </button>
                </>
              ) : (
                <>
                  <button className={s.modifyBtn} onClick={handleEdit}>
                    수정
                  </button>
                  <span className={s.divider}>|</span>
                  <button className={s.deleteBtn}>삭제</button>
                </>
              )}
            </div>
          </div>
          {isEditing ? (
            <textarea
              className={s.editAnswer}
              value={editedAnswer}
              onChange={(e) => setEditedAnswer(e.target.value)}
            />
          ) : (
            <div className={s.answer}>{report.answer}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
