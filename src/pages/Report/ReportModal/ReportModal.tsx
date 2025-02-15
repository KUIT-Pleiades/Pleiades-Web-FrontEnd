import s from "./ReportModal.module.scss";
import messageIcon from "../../../assets/Icon/message.svg";
import closeBtn from "../../../assets/btnImg/closeBtn.svg";
import { useState, useEffect } from "react";
import { formatDateTime } from "../../../functions/formatDateTime";

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
  onDelete: (reportId: number) => void;
}

const ReportModal = ({
  report,
  onClose,
  onUpdate,
  onDelete,
}: ReportModalProps) => {
  const [isEditing, setIsEditing] = useState(false);
	const [editedAnswer, setEditedAnswer] = useState(report.answer);
	const [localReport, setLocalReport] = useState(report);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const maxLength = 150;

  useEffect(() => {
    setEditedAnswer(report.answer);
    setLocalReport(report);
  }, [report]);

  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => {
      const textarea = document.querySelector(
        `.${s.editAnswer}`
      ) as HTMLTextAreaElement;
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
      }
    }, 0);
  };

  const handleSave = async () => {
    if (!editedAnswer.trim()) {
      setError("답변 내용을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      await onUpdate(report.reportId, editedAnswer.trim());
      setIsEditing(false);
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "답변 수정 중 오류가 발생했습니다."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setEditedAnswer(localReport.answer);
    setIsEditing(false);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= maxLength) {
      setEditedAnswer(text);
      e.target.style.height = "auto";
      e.target.style.height = e.target.scrollHeight + "px";
    }
	};
	
	const handleDelete = () => {
    if (window.confirm("정말로 이 리포트를 삭제하시겠습니까?")) {
      onDelete(localReport.reportId);
    }
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
              <div className={s.question}>{localReport.question}</div>
              <div className={s.date}>
                {new Date(localReport.createdAt).toLocaleDateString()}
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
              {formatDateTime(localReport.modifiedAt)}
            </div>
            {!isEditing ? (
              <div className={s.btnGroup}>
                <button className={s.modifyBtn} onClick={handleEdit}>
                  수정
                </button>
                <span className={s.divider}>|</span>
                <button className={s.deleteBtn} onClick={handleDelete}>
                  삭제
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          {isEditing ? (
            <div className={s.editWrapper}>
              <textarea
                className={s.editAnswer}
                value={editedAnswer}
                onChange={handleTextChange}
                maxLength={maxLength}
              />
              {error && <div className={s.error}>{error}</div>}
              <div className={s.editFooter}>
                <div className={s.characterCount}>
                  {editedAnswer.length} / {maxLength}byte
                </div>
                <div className={s.buttonGroup}>
                  <button
                    className={s.saveBtn}
                    onClick={handleSave}
                    disabled={isSubmitting || !editedAnswer.trim()}
                  >
                    {isSubmitting ? "저장 중..." : "완료"}
                  </button>
                  <button className={s.cancelBtn} onClick={handleCancel}>
                    취소
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className={s.answer}>{localReport.answer}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
