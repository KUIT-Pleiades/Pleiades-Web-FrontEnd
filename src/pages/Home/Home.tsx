import { Outlet, useLocation } from "react-router-dom";
import BottomBar from "../../pageLayout/BottomBar";

export default function Home() {
  const location = useLocation();
  const isSetup = location.pathname.includes("charactersetting");

  return (
    <>
      <Outlet />
      {isSetup ? "" : <BottomBar />}
    </>
  );
}
