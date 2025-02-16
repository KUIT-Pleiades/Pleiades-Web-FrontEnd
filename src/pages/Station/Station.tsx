import { Outlet } from "react-router-dom";
import BottomBar from "../../pageLayout/BottomBar";

export default function Station() {
  const isSetup = location.pathname.includes("createstation");
  return (
    <div>
      <Outlet />
      {isSetup ? "" : <BottomBar />}
    </div>
  );
}
