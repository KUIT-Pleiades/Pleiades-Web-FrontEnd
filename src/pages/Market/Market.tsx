import { Outlet, useLocation } from "react-router-dom";
import BottomBar from "../../pageLayout/BottomBar";

export default function Market() {
    const location = useLocation();
    const isNoBottomBar = location.pathname.includes("official-store");

    return (
        <div>
            <Outlet />
            {!isNoBottomBar && <BottomBar />}
        </div>
    );
}
