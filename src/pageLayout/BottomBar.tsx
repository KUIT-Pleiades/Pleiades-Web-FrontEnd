import { BarContent } from "../types/types";
import s from "./BottomBar.module.scss";
import starIcon from "../assets/bottomBarImg/starIcon.svg";
import selectedStarIcon from "../assets/bottomBarImg/starIconSelected.png";
import stationIcon from "../assets/bottomBarImg/stationIcon.svg";
import selectedStationIcon from "../assets/bottomBarImg/stationIconSelected.png";
import rocketIcon from "../assets/bottomBarImg/stationIcon.svg";
import selectedRocketIcon from "../assets/bottomBarImg/stationIconSelected.png";
import settingIcon from "../assets/bottomBarImg/settingIcon.svg";
import selectedSettingIcon from "../assets/bottomBarImg/settingIconSelected.png";
import BottomBarItem from "./BottomBarItem";

export default function BottomBar() {
  const bottomBarContents: BarContent[] = [
    {
      tag: "별",
      defaultImg: starIcon,
      selectedImg: selectedStarIcon,
      link: "/home",
    },
    {
      tag: "정거장",
      defaultImg: stationIcon,
      selectedImg: selectedStationIcon,
      link: "/station/stationlist",
    },
    {
      tag: "상점",
      defaultImg: rocketIcon,
      selectedImg: selectedRocketIcon,
      link: "/market",
    },
    {
      tag: "설정",
      defaultImg: settingIcon,
      selectedImg: selectedSettingIcon,
      link: "/setting",
    },
  ];

  return (
    <div className={s.bottomBar}>
      {bottomBarContents.map((item) => (
        <BottomBarItem
          key={item.tag}
          itemTag={item.tag}
          defaultImg={item.defaultImg}
          selectedImg={item.selectedImg}
          link={item.link}
        />
      ))}
    </div>
  );
}
