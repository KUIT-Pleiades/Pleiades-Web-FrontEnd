import s from "./HomeBar.module.scss";
//import coinImg from "../../../assets/home/coin.svg";
import stoneImg from "../../../assets/home/stone.svg";
//import notification from "../../../assets/home/notification.svg";
import custom from "../../../assets/home/custom.svg";
import social from "../../../assets/home/social.svg";
import { useNavigate } from "react-router-dom";
import { useCharacterStore } from "../../../store/useCharacterStore";
import { useEffect } from "react";

export default function HomeBar() {
  const navigate = useNavigate();
  const { userInfo, fetchUserStone } = useCharacterStore();

  useEffect(() => {
    fetchUserStone();
  }, [userInfo.stone]);
  
  return (
    <div className={s.homeBarContainer}>

      <div className={s.assets}>
        <img className={s.icon} src={stoneImg} alt="stone" />
        <p className={s.balance}>{userInfo.stone}</p>
      </div>

      <div className={s.utils}>
        <img src={custom} alt="캐릭터수정" onClick={() => navigate("/home/charactersetting")} />
        <img src={social} alt="친구" onClick={() => navigate("/friendtab")} />
      </div>

    </div>
  );
}
