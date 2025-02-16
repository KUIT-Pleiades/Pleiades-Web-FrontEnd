import { Outlet, useLocation } from "react-router-dom";
import BottomBar from "../../pageLayout/BottomBar";

export default function Station() {
  const location = useLocation(); // useLocation 훅 추가
  const isSetup = location.pathname.includes("createstation");

  return (
    <div>
      <Outlet />
      {!isSetup && <BottomBar />}
    </div>
  );
}