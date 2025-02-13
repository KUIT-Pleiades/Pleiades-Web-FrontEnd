import backBtn from "../../assets/btnImg/backBtn.png";
import s from "./Report.module.scss";
import { useCharacterStore } from "../../store/useCharacterStore";
import SearchReportsBar from "../../components/SearchReportsBar/SearchReportsBar";
import ReportList from "./ReportList/ReportList";
import { useState } from "react";
import SearchReport from "./SearchReport/SearchReport";


const Report = () => {
  const [reports, setReports] = useState([
    {
      reportId: 123,
      questionId: 2,
      question: "아버지는 어떤 분인가요?",
      createdAt: "2025-02-02 03:14",
      modifiedAt: "2025-02-02 03:14",
      answer: "항상 자상하고 바쁜 와중에도...",
    },
    {
      reportId: 23,
      questionId: 100,
      question: "졸림?",
      createdAt: "2025-02-02 03:14",
      modifiedAt: "2025-02-02 03:18",
      answer:
        "항상 자상하고 바쁜 와중에도 꼭 놀러 데려가주시는 존경스러운  아빠입니다. 아빠가 사주시는 붕어빵이 참 맛있어요 😍",
    },
    {
      reportId: 34,
      questionId: 29,
      question: "배고픔?",
      createdAt: "2025-02-02 03:14",
      modifiedAt: "2025-02-02 03:19",
      answer:
        "항상 자상하고 바쁜 와중에도 꼭 놀러 데려가주시는 존경스러운  아빠입니다. 아빠가 사주시는 붕어빵이 참 맛있어요 😍항상 자상하고 바쁜 와중에도 꼭 놀러 데려가주시는 존경스러운  아빠입니다. 아빠가 사주시는 붕어빵이 참 맛있어요 😍항상 자상하고 바쁜 와중에도 꼭 놀러 데려가주시는 존경스러운  아빠입니다. 아빠가 사주시는 붕어빵이 참 맛있어요 😍항상 자상하고 바쁜 와중에도 꼭 놀러 데려가주시는 존경스러운  아빠입니다. 아빠가 사주시는 붕어빵이 참 맛있어요 😍",
    },
    {
      reportId: 34,
      questionId: 29,
      question: "배고픔?",
      createdAt: "2025-02-02 03:14",
      modifiedAt: "2025-02-02 03:19",
      answer: "ㅇ",
    },
    {
      reportId: 34,
      questionId: 29,
      question: "배고픔?",
      createdAt: "2025-02-02 03:14",
      modifiedAt: "2025-02-02 03:19",
      answer: "ㅇ",
    },
    {
      reportId: 34,
      questionId: 29,
      question: "배고픔?",
      createdAt: "2025-02-02 03:14",
      modifiedAt: "2025-02-02 03:19",
      answer: "ㅇ",
    },
    {
      reportId: 34,
      questionId: 29,
      question: "배고픔?",
      createdAt: "2025-02-02 03:14",
      modifiedAt: "2025-02-02 03:19",
      answer: "ㅇ",
    },
    {
      reportId: 34,
      questionId: 29,
      question: "배고픔?",
      createdAt: "2025-02-02 03:14",
      modifiedAt: "2025-02-02 03:19",
      answer: "ㅇ",
    },
  ]);

  const [searchHistory, setSearchHistory] = useState([
    "완벽한",
    "선물",
    "붕어빵",
  ]);

  const [searchValue, setSearchValue] = useState("");

  const [filteredReports, setFilteredReports] = useState(reports); // 검색된 리포트 목록
  const [isSearchResult, setIsSearchResult] = useState(false); // 검색 결과 화면 여부

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchValue.trim()) {
      // 검색 기록 추가
      setSearchHistory((prev) => {
        if (!prev.includes(searchValue.trim())) {
          const newHistory = [...prev, searchValue.trim()];
          if (newHistory.length > 10) {
            newHistory.shift(); // 최대 10개 유지
          }
          return newHistory;
        }
        return prev;
      });

      // 리포트 필터링
      const filtered = reports.filter((report) =>
        report.question.toLowerCase().includes(searchValue.trim().toLowerCase())
      );

      setFilteredReports(filtered); // 필터링된 결과 저장
      setIsSearchResult(true); // 검색 결과 화면으로 전환
      setShowSearchHistory(false); // 검색 기록 숨기기
      setSearchValue(""); // 검색창 초기화
    }
  };

  const [showSearchHistory, setShowSearchHistory] = useState(false);
  
	const handleSearchFocus = () => {
    setShowSearchHistory(true); // 검색 기록 보여주기
    setIsSearchResult(false); // 검색 결과 화면 해제
  };

  const handleSearchBlur = () => {
    setShowSearchHistory(false);
  };

  const handleDeleteHistory = (index: number) => {
    setSearchHistory((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSelectHistory = (value: string) => {
    setSearchValue(value);
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

  const { userInfo } = useCharacterStore();

  return (
    <div className={s.container}>
      {/*================================ 헤더 ===================================*/}
      <div className={s.headerWrapper}>
        <div className={s.header}>
          <img src={backBtn} alt="뒤로가기" className={s.backBtn} />
          <div className={s.headerTitle}>리포트</div>
        </div>
        <div className={s.userRecord}>
          <strong>{userInfo.userName}</strong>님의 기록이에요
        </div>
      </div>
      {/*=============================== 검색창 ===================================*/}
      <div className={s.searchWrapper}>
        <SearchReportsBar
          value={searchValue}
          onChange={handleSearchChange}
          onSubmit={handleSearchSubmit}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
        />
      </div>

      {/*============================= 리포트 목록 ================================*/}
      {showSearchHistory ? (
        // 검색 기록 화면
        <div className={s.searchReport}>
          <SearchReport
            searchHistory={searchHistory}
            onDeleteHistory={handleDeleteHistory}
            onSelectHistory={handleSelectHistory}
          />
        </div>
      ) : isSearchResult ? (
        // 검색 결과 화면
        <div className={s.searchReport}>
          <ReportList
            reports={filteredReports}
            onUpdateReport={handleUpdateReport}
            isSearchResult={true}
          />
        </div>
      ) : (
        // 기본 리포트 목록 화면
        <div className={s.reportList}>
          <ReportList
            reports={reports}
            onUpdateReport={handleUpdateReport}
            isSearchResult={false}
          />
        </div>
      )}
    </div>
  );
};

export default Report;
