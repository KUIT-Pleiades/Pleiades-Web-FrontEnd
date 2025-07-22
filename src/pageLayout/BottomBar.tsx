import { BarContent } from "../types/types";
import s from "./BottomBar.module.scss";
import starIcon from "../assets/bottomBarImg/starIcon.svg";
import selectedStarIcon from "../assets/bottomBarImg/starIconSelected.png";
import stationIcon from "../assets/bottomBarImg/stationIcon.svg";
import selectedStationIcon from "../assets/bottomBarImg/stationIconSelected.png";
import shopIcon from "../assets/bottomBarImg/shop.svg";
import selectedShopIcon from "../assets/bottomBarImg/shopSelected.png";
import settingIcon from "../assets/bottomBarImg/settingIcon.svg";
import selectedSettingIcon from "../assets/bottomBarImg/settingIconSelected.png";
import starIconDark from "../assets/bottomBarImg/starIconDark.svg";
import stationIconDark from "../assets/bottomBarImg/stationIconDark.svg";
import shopIconDark from "../assets/bottomBarImg/shopDark.svg";
import settingIconDark from "../assets/bottomBarImg/settingIconDark.svg";
import BottomBarItem from "./BottomBarItem";
import { useLocation } from "react-router-dom";

export default function BottomBar() {
  const location = useLocation();
  const isDarkMode = location.pathname.includes("/station");

  const bottomBarContents: BarContent[] = [
    {
      tag: "별",
      defaultImg: starIcon,
      selectedImg: selectedStarIcon,
      darkModeImg: starIconDark,
      link: "/home",
    },
    {
      tag: "정거장",
      defaultImg: stationIcon,
      selectedImg: selectedStationIcon,
      darkModeImg: stationIconDark,
      link: "/station",
    },
    {
      tag: "상점",
      defaultImg: shopIcon,
      selectedImg: selectedShopIcon,
      darkModeImg: shopIconDark,
      link: "/market",
    },
    {
      tag: "설정",
      defaultImg: settingIcon,
      selectedImg: selectedSettingIcon,
      darkModeImg: settingIconDark,
      link: "/setting",
    },
  ];

  return (
    <nav
      id="bottom-bar"
      className={`${s.bottomBar} ${isDarkMode ? s.bottomBarDark : s.bottomBarLight}`}
    >
      {bottomBarContents.map((item) => (
        <BottomBarItem
          key={item.tag}
          itemTag={item.tag}
          defaultImg={item.defaultImg}
          selectedImg={item.selectedImg}
          darkModeImg={item.darkModeImg}
          link={item.link}
          isDarkMode={isDarkMode}
        />
      ))}
    </nav>
  );
}
