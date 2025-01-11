import { Outlet } from "react-router-dom";
import BottomBar from "../../pageLayout/BottomBar";

export default function Rocket() {
  return (
    <div>
      <Outlet />
      <BottomBar />
    </div>
  );
}
