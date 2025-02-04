import { Outlet } from "react-router-dom";
import BottomBar from "../../pageLayout/BottomBar";

export default function Market() {
  return (
    <div>
      <Outlet />
      <BottomBar />
    </div>
  );
}
