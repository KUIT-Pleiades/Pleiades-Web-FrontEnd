import { Outlet } from "react-router-dom";
import BottomBar from "../../pageLayout/BottomBar";
import PersonalSetting from "./PersonalSetting/PersonalSetting";

export default function Setting() {
  return (
    <>
			<Outlet />
			<PersonalSetting/>
      <BottomBar />
    </>
  );
}
