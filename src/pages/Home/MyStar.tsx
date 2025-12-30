import { getImage } from "../../functions/getImage";
// import { useCharacterStore } from "../../store/useCharacterStore";
import s from "./MyStar.module.scss";
import { useCharacterStore } from "../../store/useCharacterStore";
import pleiadeslogo from "../../assets/bottomBarImg/starIconSelected.svg";
import diary from "../../assets/home/diary.svg";
import HomeBar from "./HomeBar/HomeBar";
import { useNavigate } from "react-router-dom";

export default function MyStar() {
  const { userInfo } = useCharacterStore();
  const navigate = useNavigate();
  const userCharacter = `${userInfo.character}`;
  const background = getImage(userInfo.starBackground);

  const showDiary = () => {
    navigate("/report");
  };

  return (
    <div className={s.container}>
      <img className={s.background} src={background} alt="background" />
      <div className={s.dim} />
      <HomeBar stoneBalance={300} />
      <div className={s.title}>
        <img className={s.planet} src={pleiadeslogo} alt="star" />
        <p className={s.owner}>{userInfo.userName}님의 별</p>
      </div>
      <img className={s.character} src={userCharacter} alt="캐릭터" />
      <img className={s.diary} src={diary} alt="일기장" onClick={showDiary} />
    </div>
  );
}
