import { Outlet, useLocation } from "react-router-dom";
import BottomBar from "../../pageLayout/BottomBar";
import { useEffect, useState } from "react";
import { User } from "../../interfaces/Interfaces";
import { getUser } from "../../functions/getUserInfo";
import Default from "./Default";

export default function Home() {
  const [userData, setUserData] = useState<User>();
  const location = useLocation();
  const isSetup = location.pathname.includes("charactersetting");

  useEffect(() => {
    //홈화면에서 데이터 받아오기
    getUser().then((data) => {
      if (data !== null) {
        setUserData(data);
      }
    });
    console.log(userData === undefined);
  }, [userData]);

  return (
    <>
      {userData === undefined ? <Default /> : <Outlet />}
      {isSetup ? "" : <BottomBar />}
    </>
  );
}
