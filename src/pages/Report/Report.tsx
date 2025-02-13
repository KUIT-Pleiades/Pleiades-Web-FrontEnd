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

	

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
	};
	
	const handleSearchSubmit = () => {
    if (searchValue.trim()) {
      setSearchHistory((prev) => {
        // 중복 검색어 방지
        if (!prev.includes(searchValue.trim())) {
          // 최대 10개까지만 저장
          const newHistory = [...prev, searchValue.trim()];
          if (newHistory.length > 10) {
            newHistory.shift(); // 가장 오래된 검색어 제거
          }
          return newHistory;
        }
        return prev;
      });
      setSearchValue("");
    }
  };

	const [showSearchHistory, setShowSearchHistory] = useState(false);
	const handleSearchFocus = () => {
    setShowSearchHistory(true);
	};

	const handleSearchBlur = () => {
    
      setShowSearchHistory(true);
    
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
        <div className={s.searchReport}>
          <SearchReport
            searchHistory={searchHistory}
            onDeleteHistory={handleDeleteHistory}
            onSelectHistory={handleSelectHistory}
          />
        </div>
      ) : (
        <div className={s.reportList}>
          <ReportList reports={reports} onUpdateReport={handleUpdateReport} />
        </div>
      )}
    </div>
  );
};

export default Report;
