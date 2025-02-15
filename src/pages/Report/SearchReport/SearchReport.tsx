import s from "./SearchReport.module.scss";
import closeBtn from "../../../assets/btnImg/closeBtn.svg";

interface SearchHistoryItem {
  id: number;
  query: string;
  createdAt: string;
}

interface SearchReportProps {
  searchHistory: SearchHistoryItem[];
  onDeleteHistory: (id: number) => void;
  onSelectHistory: (query: string) => void;
}

const SearchReport: React.FC<SearchReportProps> = ({
  searchHistory,
  onDeleteHistory,
  onSelectHistory,
}) => {
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); // blur 이벤트 발생 방지
  };

  return (
    <div className={s.searchContainer}>
      <div className={s.recentSearch}>최근 검색</div>
      <div className={s.historyContainer}>
        {searchHistory.length === 0 ? (
          <div className={s.emptyMessage}>검색 내역이 없어요</div>
        ) : (
          searchHistory.map((item) => (
            <div
              key={item.id}
              className={s.historyItem}
              onMouseDown={handleMouseDown}
            >
              <span onClick={() => onSelectHistory(item.query)}>
                {item.query}
              </span>
              <button
                className={s.deleteButton}
                onClick={() => onDeleteHistory(item.id)}
              >
                <img src={closeBtn} alt="삭제" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchReport;
