import backBtn from "../../assets/btnImg/backBtn.png";
import s from "./Report.module.scss";
import { useCharacterStore } from "../../store/useCharacterStore";
import SearchReportsBar from "./SearchReportsBar/SearchReportsBar";
import ReportList from "./ReportList/ReportList";
import { useState, useEffect } from "react";
import SearchReport from "./SearchReport/SearchReport";
import { fetchRequest } from "../../functions/fetchRequest";

interface Report {
  reportId: number;
  questionId: number;
  question: string;
  createdAt: string;
  modifiedAt: string;
  answer: string;
}

interface SearchHistoryItem {
  id: number;
  query: string;
  createdAt: string;
}

interface SearchHistoryResponse {
  history: SearchHistoryItem[];
}

const Report = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [isSearchResult, setIsSearchResult] = useState(false);
  const [showSearchHistory, setShowSearchHistory] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [reportsResponse, historyResponse] = await Promise.all([
          fetchRequest<{ reports: Report[] }>("/reports", "GET", null),
          fetchRequest<SearchHistoryResponse>("/reports/history", "GET", null),
        ]);

        if (reportsResponse && reportsResponse.reports) {
          setReports(reportsResponse.reports);
          setFilteredReports(reportsResponse.reports);
        } else {
          throw new Error("리포트를 불러오는데 실패했습니다.");
        }

        if (historyResponse && historyResponse.history) {
          setSearchHistory(historyResponse.history);
        } else {
          throw new Error("검색 기록을 불러오는데 실패했습니다.");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = async () => {
    if (searchValue.trim()) {
      try {
        // 검색어 저장 API 호출
        await fetchRequest("/reports/history", "POST", {
          query: searchValue.trim(),
        });

        // 검색 기록 다시 불러오기
        const historyResponse = await fetchRequest<SearchHistoryResponse>(
          "/reports/history",
          "GET",
          null
        );
        if (historyResponse && historyResponse.history) {
          setSearchHistory(historyResponse.history);
        }

        const filtered = reports.filter((report) =>
          report.question
            .toLowerCase()
            .includes(searchValue.trim().toLowerCase())
        );

        setFilteredReports(filtered);
        setIsSearchResult(true);
        setShowSearchHistory(false);
        setSearchValue("");
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "검색 처리 중 오류가 발생했습니다."
        );
      }
    }
  };

  const handleSearchFocus = () => {
    setShowSearchHistory(true);
    setIsSearchResult(false);
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      setShowSearchHistory(false);
    }, 200); // 검색어 선택할 시간을 주기 위한 지연
  };

  const handleDeleteHistory = async (id: number) => {
    try {
      // 검색어 삭제 API 호출
      await fetchRequest(`/reports/history/${id}`, "DELETE", null);

      // 검색 기록 다시 불러오기
      const historyResponse = await fetchRequest<SearchHistoryResponse>(
        "/reports/history",
        "GET",
        null
      );
      if (historyResponse && historyResponse.history) {
        setSearchHistory(historyResponse.history);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "검색 기록 삭제 중 오류가 발생했습니다."
      );
    }
  };

  const handleSelectHistory = (query: string) => {
    setSearchValue(query);
    setShowSearchHistory(true);
  };

  const handleUpdateReport = (reportId: number, newAnswer: string) => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.reportId === reportId
          ? {
              ...report,
              answer: newAnswer,
              modifiedAt: new Date().toISOString(),
            }
          : report
      )
    );
  };

  const handleDeleteReport = (reportId: number) => {
    setReports((prevReports) =>
      prevReports.filter((report) => report.reportId !== reportId)
    );

    if (isSearchResult) {
      setFilteredReports((prevFiltered) =>
        prevFiltered.filter((report) => report.reportId !== reportId)
      );
    }
  };

  const { userInfo } = useCharacterStore();

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러: {error}</div>;
  }

  return (
    <div className={s.container}>
      <div className={s.headerWrapper}>
        <div className={s.header}>
          <img src={backBtn} alt="뒤로가기" className={s.backBtn} />
          <div className={s.headerTitle}>리포트</div>
        </div>
        <div className={s.userRecord}>
          <strong>{userInfo.userName}</strong>님의 기록이에요
        </div>
      </div>
      <div className={s.searchWrapper}>
        <SearchReportsBar
          value={searchValue}
          onChange={handleSearchChange}
          onSubmit={handleSearchSubmit}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
        />
      </div>

      {showSearchHistory ? (
        <div className={s.searchReport}>
          <SearchReport
            searchHistory={searchHistory}
            onDeleteHistory={handleDeleteHistory}
            onSelectHistory={(query) => handleSelectHistory(query)}
          />
        </div>
      ) : isSearchResult ? (
        <div className={s.searchReport}>
          <ReportList
            reports={filteredReports}
            onUpdateReport={handleUpdateReport}
            onDeleteReport={handleDeleteReport}
            isSearchResult={true}
          />
        </div>
      ) : (
        <div className={s.reportList}>
          <ReportList
            reports={reports}
            onUpdateReport={handleUpdateReport}
            onDeleteReport={handleDeleteReport}
            isSearchResult={false}
          />
        </div>
      )}
    </div>
  );
};

export default Report;
