import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import s from "./BalanceGame.module.scss";
import AdSenseUnit from "../../../components/AdSense/AdSenseUnit";
import { useCharacterStore } from "../../../store/useCharacterStore";
import backArrow from "../../../assets/pleiadesBackArrow.svg";

const QUESTIONS_PER_PAGE = 5;

const BalanceGame: React.FC = () => {
  const navigate = useNavigate();
  const { fetchUserStone } = useCharacterStore();
  const [questions, setQuestions] = useState<any[]>([]);
  const [setId, setSetId] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    fetch("/balance-sets-30.json")
      .then((res) => res.json())
      .then((data) => {
        const day = new Date().getDate();
        const selectedSet = data.sets[day % data.sets.length];
        setQuestions(selectedSet.questions);
        setSetId(selectedSet.id);
      });
  }, []);

  const currentQuestions = questions.slice(
    currentPage * QUESTIONS_PER_PAGE,
    (currentPage + 1) * QUESTIONS_PER_PAGE
  );

  const handleSelect = (qId: string, choice: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: choice }));
  };

  const isPageDone = currentQuestions.length > 0 && currentQuestions.every((q) => !!answers[q.id]);
  const isAllDone = Object.keys(answers).length === 15;

  const handlePageChange = (nextPage: number) => {
    setCurrentPage(nextPage);
    // 페이지가 바뀔 때 화면을 최상단으로 이동시켜 다음 문제들이 바로 보이게 함
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleComplete = async () => {
    if (!isAllDone) return;
    try {
      // PM 요청 API 호출
      await fetch("/api/balance/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ setId }),
      });
      
      setIsCompleted(true);
      fetchUserStone();
      alert("10 스톤이 충전되었습니다!");
      navigate("/market");
    } catch (e) {
      console.error("완료 처리 중 오류:", e);
    }
  };

  return (
    <div className={s.container}>
      {/* MarketHome 스타일의 헤더 */}
      <div className={s.header}>
        <div className={s.headerContent}>
          <img
            src={backArrow}
            alt="back arrow"
            className={s.backArrow}
            onClick={() => navigate(-1)}
          />
          <span className={s.headerTitle}>오늘의 밸런스</span>
        </div>
      </div>

      <div className={s.content}>
        <div className={s.statusSection}>
          <div className={s.setIdBadge}>{setId}</div>
          <div className={s.progressText}>
            <span>{Object.keys(answers).length} / 15</span> 완료
          </div>
        </div>

        {/* 페이지 인디케이터 (도트) */}
        <div className={s.dotsContainer}>
          {[0, 1, 2].map((idx) => (
            <div key={idx} className={`${s.dot} ${currentPage === idx ? s.activeDot : ""}`} />
          ))}
        </div>

        <div className={s.questionList}>
          {currentQuestions.map((q, idx) => (
            <React.Fragment key={q.id}>
              <div className={s.card}>
                <div className={s.qBadge}>Q.</div>
                <p className={s.prompt}>{q.prompt}</p>
                <div className={s.optionsRow}>
                  <button 
                    className={`${s.option} ${answers[q.id] === "A" ? s.selected : ""}`}
                    onClick={() => handleSelect(q.id, "A")}
                  >
                    {q.a}
                  </button>
                  <div className={s.vsText}>VS</div>
                  <button 
                    className={`${s.option} ${answers[q.id] === "B" ? s.selected : ""}`}
                    onClick={() => handleSelect(q.id, "B")}
                  >
                    {q.b}
                  </button>
                </div>
              </div>
              {/* 광고 위치 유지 */}
              {[1, 2, 3, 4].includes(idx) && (
                <div className={s.adContainer} key={`ad-${currentPage}-${idx}`}>
                  <div className={s.adLabel}>ADVERTISEMENT</div>
                  <AdSenseUnit />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className={s.footer}>
          <button 
            className={s.navBtn} 
            disabled={currentPage === 0} 
            onClick={() => handlePageChange(currentPage - 1)}
          >
            이전
          </button>
          
          {currentPage < 2 ? (
            <button 
              className={s.nextBtn} 
              disabled={!isPageDone} // 현재 페이지 5개를 다 풀어야 활성화
              onClick={() => handlePageChange(currentPage + 1)}
            >
              다음 페이지
            </button>
          ) : (
            <button 
              className={s.completeBtn} 
              disabled={!isAllDone || isCompleted} 
              onClick={handleComplete}
            >
              {isCompleted ? "지급 완료" : "스톤 받기"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BalanceGame;