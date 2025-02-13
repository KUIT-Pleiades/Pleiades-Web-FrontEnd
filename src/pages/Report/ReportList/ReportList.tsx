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
}

interface ReportListProps {
  reports: Report[];
  onUpdateReport: (reportId: number, newAnswer: string) => void;
  onDeleteReport: (reportId: number) => void;
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
            ? `검색 결과 (${reports.length})`
            : `전체 ${reports.length}`}
        </span>
      </div>
      <div className={s.scrollableList}>
        {reports.map((report) => (
          <div
            key={report.reportId}
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
                  <span className={s.question}>{report.question}</span>
                  <span className={s.date}>
                    {new Date(report.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <div className={s.answerWrapper}>
              <span className={s.answer}>
                {report.answer.length > 20
                  ? `${report.answer.slice(0, 20)}...`
                  : report.answer}
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
          onDelete={(reportId) => {
            onDeleteReport(reportId);
            setSelectedReport(null); // 모달 닫기
          }}
        />
      )}
    </>
  );
};

export default ReportList;
