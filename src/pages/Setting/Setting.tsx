import { Outlet } from "react-router-dom";
import BottomBar from "../../pageLayout/BottomBar";

export default function Setting() {
  return (
    <>
      <Outlet />
      <BottomBar />
    </>
  );
}
