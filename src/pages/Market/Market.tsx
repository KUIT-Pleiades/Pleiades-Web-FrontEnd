import { Outlet } from "react-router-dom";
//import BottomBar from "../../pageLayout/BottomBar";
import MarketBar from "./MarketBar/MarketBar";

export default function Market() {
  return (
    <div>
      <MarketBar />
      <Outlet />
			{/* <BottomBar /> */}
    </div>
  );
}
