import s from "./HomeBar.module.scss";
import coinImg from "../../../assets/home/coin.svg";
import stoneImg from "../../../assets/home/stone.svg";
import notification from "../../../assets/home/notification.svg";
import custom from "../../../assets/home/custom.svg";
import social from "../../../assets/home/social.svg";
import { useNavigate } from "react-router-dom";

interface HomeBarProps {
  coinBalance: number;
  stoneBalance: number;
}

export default function HomeBar({ coinBalance, stoneBalance }: HomeBarProps) {
  const navigate = useNavigate();
  return (
    <div className={s.homeBarContainer}>
      <div className={s.assets}>
        <div className={s.item}>
          <img src={coinImg} alt="coin" />
          <p className={s.balance}>{coinBalance}</p>
        </div>
        <div className={s.item}>
          <img src={stoneImg} alt="coin" />
          <p className={s.balance}>{stoneBalance}</p>
        </div>
      </div>
      <div className={s.utils}>
        <img
          src={notification}
          alt="알림"
          onClick={() => navigate("/notification")}
        />
        <img
          src={custom}
          alt="캐릭터수정"
          onClick={() => navigate("/home/charactersetting")}
        />
        <img src={social} alt="친구" onClick={() => navigate("/friendtab")} />
      </div>
    </div>
  );
}
