import { useEffect } from "react";
import { getImage } from "../../functions/getImage";
// import { useCharacterStore } from "../../store/useCharacterStore";
import s from "./MyStar.module.scss";
import { useNavigate } from "react-router-dom";
import { useCharacterStore } from "../../store/useCharacterStore";

export default function MyStar() {
  // const { userInfo } = useCharacterStore();
  const navigate = useNavigate();
  const { userInfo } = useCharacterStore();

  useEffect(() => {
    if (!userInfo.userId) {
      navigate("/onboarding");
    }
  }, [userInfo.userId, navigate]);
  const background = getImage("background_01");

  return (
    <div className={s.container}>
      <img className={s.background} src={background} />
    </div>
  );
}
