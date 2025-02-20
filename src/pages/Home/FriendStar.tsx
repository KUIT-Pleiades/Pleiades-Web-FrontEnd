import s from "./FriendStar.module.scss";
import pleiadeslogo from "../../assets/bottomBarImg/starIconSelected.png";
import diary from "../../assets/home/diary.svg";
import { getImage } from "../../functions/getImage";

export default function FriendStar() {
  const background = getImage("background_01");
  return (
    <div className={s.container}>
      <img className={s.background} src={background} alt="background" />
      <div className={s.dim} />
      <div className={s.title}>
        <img className={s.planet} src={pleiadeslogo} alt="star" />
        <p className={s.owner}>{"userInfo.userName"}님의 별</p>
      </div>
      <img className={s.character} src={"userCharacter"} alt="캐릭터" />
      <img className={s.diary} src={diary} alt="일기장" />
    </div>
  );
}
