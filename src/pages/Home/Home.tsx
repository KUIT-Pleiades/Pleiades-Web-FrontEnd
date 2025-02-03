import { Outlet } from "react-router-dom";
import BottomBar from "../../pageLayout/BottomBar";
import { useEffect, useState } from "react";
import { User } from "../../interfaces/Interfaces";
import { getUser } from "../../functions/getUserInfo";

export default function Home() {
  const [userData, setUserData] = useState<User>();

  useEffect(() => {
    //홈화면에서 데이터 받아오기
    getUser().then((data) => {
      if (data !== null) {
        setUserData(data);
      }
    });
  }, []);

  return (
    <div>
      {userData?.birthDate}
      <Outlet />
      <BottomBar />
    </div>
  );
}
