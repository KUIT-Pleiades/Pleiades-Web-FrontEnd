import s from "./SearchReport.module.scss";
import closeBtn from "../../../assets/btnImg/closeBtn.svg";

interface SearchReportProps {
  searchHistory: string[];
  onDeleteHistory: (index: number) => void;
  onSelectHistory: (value: string) => void;
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
        {searchHistory.map((item, index) => (
          <div
            key={index}
            className={s.historyItem}
            onMouseDown={handleMouseDown}
          >
            <span onClick={() => onSelectHistory(item)}>{item}</span>
            <button
              className={s.deleteButton}
              onClick={() => onDeleteHistory(index)}
            >
              <img src={closeBtn} alt="삭제" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchReport;
