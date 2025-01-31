import s from "./Error.module.scss";
import backGroundImg1 from "../../assets/splashBackGround1.svg";
import backGroundImg2 from "../../assets/splashBackGround2.svg";
import backGroundImg3 from "../../assets/splashBackGround3.svg";
import backGroundImg4 from "../../assets/splashBackGround4.svg";
import { useNavigate } from "react-router-dom";

interface ErrorPageProps {
  title: string;
  subTitle: string;
  destination: string;
  buttonDescription: string;
}

export default function Error({
  title,
  subTitle,
  destination,
  buttonDescription,
}: ErrorPageProps) {
  const navigate = useNavigate();

  const goHome = () => {
    navigate(destination);
  };
  return (
    <div className={s.splashContainer}>
      <img className={s.backGround1} src={backGroundImg1} alt=" " />
      <img className={s.backGround2} src={backGroundImg2} alt="  " />
      <img className={s.backGround3} src={backGroundImg3} alt="  " />
      <img className={s.backGround4} src={backGroundImg4} alt="  " />
      <div className={s.content}>
        <p className={s.subTitle}>{subTitle}</p>
        <p className={s.title}>{title}</p>
        <button className={s.homeButton} onClick={goHome}>
          {buttonDescription}
        </button>
      </div>
    </div>
  );
}
