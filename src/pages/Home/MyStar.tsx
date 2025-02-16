import { getImage } from "../../functions/getImage";
// import { useCharacterStore } from "../../store/useCharacterStore";
import s from "./MyStar.module.scss";
import { useCharacterStore } from "../../store/useCharacterStore";
import pleiadeslogo from "../../assets/bottomBarImg/starIconSelected.png";
import diary from "../../assets/home/diary.svg";
import HomeBar from "./HomeBar/HomeBar";
import Pending from "../LogIn/Pending";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../store/authStore";
import { Message, User } from "../../interfaces/Interfaces";
import { fetchRequest } from "../../functions/fetchRequest";
import { useNavigate } from "react-router-dom";

export default function MyStar() {
  const { userInfo, updateUserInfo } = useCharacterStore();
  const [isLoading, setIsLoading] = useState(true);
  const { authorization } = useAuth();
  const navigate = useNavigate();
  const userCharacter = `https://gateway.pinata.cloud/ipfs/${userInfo.character}`;
  const background = getImage(userInfo.starBackground);

  const fetchUserInfo = useCallback(async () => {
    function isMessage(data: User | Message): data is Message {
      return "message" in data;
    }
    const data = await fetchRequest<User | Message>("/home", "GET", null);
    if (data !== null) {
      if (isMessage(data)) {
        console.log(data.message);
        navigate("/onboarding");
      } else {
        updateUserInfo(data);
      }
    } else navigate("/login");
  }, [navigate, updateUserInfo]);

  useEffect(() => {
    if (authorization !== null) {
      fetchUserInfo();
    } else navigate("/loginfail");
  }, [fetchUserInfo, navigate, updateUserInfo, authorization]);

  useEffect(() => {
    if (userInfo.userId !== "") {
      setIsLoading(false);
    }
  }, [userInfo.userId]);

  return isLoading ? (
    <Pending />
  ) : (
    <div className={s.container}>
      <img className={s.background} src={background} alt="background" />
      <div className={s.dim} />
      <HomeBar coinBalance={0} stoneBalance={0} />
      <div className={s.title}>
        <img className={s.planet} src={pleiadeslogo} alt="star" />
        <p className={s.owner}>{userInfo.userName}님의 별</p>
      </div>
      <img className={s.character} src={userCharacter} alt="캐릭터" />
      <img className={s.diary} src={diary} alt="일기장" />
    </div>
  );
}
