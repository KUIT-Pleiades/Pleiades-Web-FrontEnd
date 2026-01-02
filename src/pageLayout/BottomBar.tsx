import { BarContent } from "../types/types";
import s from "./BottomBar.module.scss";
import starIcon from "../assets/bottomBarImg/starIcon.png";
import selectedStarIcon from "../assets/bottomBarImg/starIconSelected.png";
import stationIcon from "../assets/bottomBarImg/stationIcon.png";
import selectedStationIcon from "../assets/bottomBarImg/stationIconSelected.png";
import shopIcon from "../assets/bottomBarImg/shopIcon.png";
import selectedShopIcon from "../assets/bottomBarImg/shopIconSelected.png";
import settingIcon from "../assets/bottomBarImg/settingIcon.png";
import selectedSettingIcon from "../assets/bottomBarImg/settingIconSelected.png";
import starIconDark from "../assets/bottomBarImg/starIconDark.png";
import stationIconDark from "../assets/bottomBarImg/stationIconDark.png";
import shopIconDark from "../assets/bottomBarImg/shopIconDark.png";
import settingIconDark from "../assets/bottomBarImg/settingIconDark.png";
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
