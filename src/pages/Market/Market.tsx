import { Outlet, useLocation } from "react-router-dom";
import BottomBar from "../../pageLayout/BottomBar";

export default function Market() {
    const location = useLocation();
    const isNoBottomBar = location.pathname.includes("official-store") || location.pathname.includes("balance-game");

    return (
        <div>
            <Outlet />
            {!isNoBottomBar && <BottomBar />}
        </div>
    );
}
