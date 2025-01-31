import { useNavigate } from "react-router-dom";
import s from "./LogInFailModal.module.scss";

export default function LogInFailModal() {
  const navigate = useNavigate();
  const goLogIn = () => navigate("/login");
  return (
    <div className={s.modalBackGround}>
      <div className={s.modal}>
        <div className={s.title}>로그인에 실패했습니다</div>
        <button className={s.button} onClick={goLogIn}>
          로그인 화면으로 이동
        </button>
      </div>
    </div>
  );
}
