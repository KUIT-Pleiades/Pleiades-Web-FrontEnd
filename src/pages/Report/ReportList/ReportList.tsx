import { useState } from "react";
import s from "./ReportList.module.scss";
import messageIcon from "../../../assets/Icon/message.svg";
import ReportModal from "../ReportModal/ReportModal";

interface Report {
  reportId: number;
  questionId: number;
  question: string;
  createdAt: string;
  modifiedAt: string;
  answer: string;
  isTodayReport: boolean;
}

interface ReportListProps {
  reports: Report[];
  onUpdateReport: (reportId: number, newAnswer: string) => Promise<void>;
  onDeleteReport: (reportId: number) => Promise<void>;
  isSearchResult?: boolean;
}

const ReportList = ({
  reports,
  onUpdateReport,
  onDeleteReport,
  isSearchResult,
}: ReportListProps) => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const handleReportClick = (report: Report) => {
    setSelectedReport(report);
  };

  return (
    <>
      <div className={s.listNum}>
        <span>
          {isSearchResult
            ? `검색 결과 (${reports?.length || 0})`
            : `전체 ${reports?.length || 0}`}
        </span>
      </div>
      <div className={s.scrollableList}>
        {reports?.map((report) => (
          <div
            key={report?.reportId}
            className={s.reportItem}
            onClick={() => handleReportClick(report)}
          >
            <div className={s.questionWrapper}>
              <div className={s.questionHeader}>
                <img
                  src={messageIcon}
                  alt="메세지 아이콘"
                  className={s.messageIcon}
                />
                <div className={s.questionContent}>
                  <span className={s.question}>
                    {report?.question?.length > 25
                      ? `${report.question.slice(0, 25)}...`
                      : report?.question}
                  </span>
                  <span className={s.date}>
                    {report?.createdAt &&
                      new Date(report.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <div className={s.answerWrapper}>
              <span className={s.answer}>
                {report?.answer?.length > 20
                  ? `${report.answer.slice(0, 20)}...`
                  : report?.answer}
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedReport && (
        <ReportModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          onUpdate={onUpdateReport}
          onDelete={async (reportId) => {
            try {
              await onDeleteReport(reportId);
              setSelectedReport(null); // 삭제 성공 후 모달 닫기
            } catch (err) {
              console.error("Error deleting report:", err);
            }
          }}
        />
      )}
    </>
  );
};

export default ReportList;
