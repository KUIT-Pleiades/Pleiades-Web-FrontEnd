import backBtn from "../../assets/btnImg/backBtn.png"
import s from "./Report.module.scss"
import { useCharacterStore } from "../../store/useCharacterStore";
import SearchReportsBar from "../../components/SearchReportsBar/SearchReportsBar";


const Report = () => {

	const { userInfo } = useCharacterStore();

	return (
    <div className={s.container}>
      {/*================================ 헤더 ===================================*/}
      <div className={s.headerWrapper}>
        <div className={s.header}>
          <img src={backBtn} alt="뒤로가기" className={s.backBtn} />
          <div className={s.headerTitle}>다이어리</div>
        </div>
        <div className={s.userRecord}>
          <strong>{userInfo.userName}</strong>님의 기록이에요
        </div>
      </div>
      {/*=============================== 검색창 ===================================*/}
			<div className={s.searchWrapper}>
				<SearchReportsBar/>
			</div>

      {/*============================= 리포트 목록 ================================*/}
      <div className={s.reportList}>리포트 목록</div>
    </div>
  );
}

export default Report;