import { Outlet } from "react-router-dom";
import BottomBar from "../../pageLayout/BottomBar";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    //홈화면에서 데이터 받아오기
  }, []);
  return (
    <div>
      <Outlet />
      <BottomBar />
    </div>
  );
}
