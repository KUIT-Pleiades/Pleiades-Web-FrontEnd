import { Outlet } from "react-router-dom";
import BottomBar from "../../pageLayout/BottomBar";

export default function Planet() {
  return (
    <div>
      <Outlet />
      <BottomBar />
    </div>
  );
}
