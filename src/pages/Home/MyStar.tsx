import { getImage } from "../../functions/getImage";
// import { useCharacterStore } from "../../store/useCharacterStore";
import s from "./MyStar.module.scss";
import { useCharacterStore } from "../../store/useCharacterStore";
import pleiadeslogo from "../../assets/bottomBarImg/starIconSelected.png";
import diary from "../../assets/home/diary.svg";
import HomeBar from "./HomeBar/HomeBar";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function MyStar() {
  const { userInfo, fetchUserInfo, fetchUserStone, imgVersion, updateImgVersion } = useCharacterStore();
  const navigate = useNavigate();
  const location = useLocation();
  // 스토어의 imgVersion을 뒤에 추가
  const userCharacter = `${userInfo.character}?t=${imgVersion}`;
  const background = getImage(userInfo.starBackground);

  useEffect(() => {
    fetchUserInfo();
    fetchUserStone();
    updateImgVersion();
  }, [location.state]);

  const showDiary = () => {
    navigate("/report");
  };

  return (
    <div className={s.container}>
      <img className={s.background} src={background} alt="background" />
      <div className={s.dim} />
      <HomeBar stoneBalance={userInfo.stone} />
      <div className={s.title}>
        <img className={s.planet} src={pleiadeslogo} alt="star" />
        <p className={s.owner}>{userInfo.userName}님의 별</p>
      </div>
      <img className={s.character} src={userCharacter} alt="캐릭터" />
      <img className={s.diary} src={diary} alt="일기장" onClick={showDiary} />
    </div>
  );
}
