import React, { useState, useEffect } from "react";
import s from "./MarketBottomSheet.module.scss";
import { CategoryType } from ".././OfficialUsedStore";
import ThemeCategoryTabs from "./ThemeCategoryTabs";
import SubCategoryTabs from "./SubCategoryTabs";
import { mockFaceItems } from "./MockData/mockFaceItem";
import { mockClothItems } from "./MockData/mockClothItem";
import { mockBackgroundItems } from "./MockData/mockBackgroundItem";
import stone from "../../../../assets/market/stone.svg";

const IMG_BASE_URL: string = import.meta.env.VITE_PINATA_ENDPOINT;

interface MarketBottomSheetProps {
  activeTab: string;
  activeCategory: CategoryType;
  isCollapsed: boolean;
  onItemSelect: (name: string, discription: string, type: string) => void;
}

const MarketBottomSheet: React.FC<MarketBottomSheetProps> = ({
  activeTab,
  activeCategory,
  isCollapsed,
  onItemSelect,
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [activeTheme, setActiveTheme] = useState("추천");
  const [activeSubTab, setActiveSubTab] = useState("전체");

  // activeCategory prop이 변경될 때마다 실행됩니다.
  useEffect(() => {
    // 하위 탭 상태를 '전체'로 초기화합니다.
    setActiveSubTab("전체");
  }, [activeCategory]);

  const handleSearchToggle = () => {
    setIsSearching(!isSearching);
  };

  const renderContent = () => {
    if (activeTab === "official") {
      switch (activeCategory) {
        case "face":
          return <div>공식몰 - 얼굴 아이템 목록</div>;
        case "cloth":
          return <div>공식몰 - 의상 아이템 목록</div>;
        case "background":
          return <div>공식몰 - 배경 아이템 목록</div>;
        default:
          return null;
      }
    } else if (activeTab === "used") {
      switch (activeCategory) {
        case "face": {
          const typeMap: { [key: string]: string } = {
            머리: "HAIR",
            눈: "EYES",
            코: "NOSE",
            입: "MOUTH",
            점: "MOLE",
          };

          const filteredItems = mockFaceItems.filter((item) => {
            const themeMatch =
              activeTheme === "추천" || item.theme.includes(activeTheme);
            const typeMatch =
              activeSubTab === "전체" || item.type === typeMap[activeSubTab];
            return themeMatch && typeMatch;
          });

          return (
            <div className={s.gridItems}>
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() =>
                    onItemSelect(item.name, item.description, item.type)
                  }
                >
                  <div className={s.item}>
                    <img src={`${IMG_BASE_URL}${item.name}`} alt={item.name} />
                  </div>
                  <div className={s.itemPrice}>
                    <img src={stone} />
                    {item.price}
                  </div>
                </div>
              ))}
            </div>
          );
        }
        case "cloth": {
          const accessoryTypes = [
            "EARS",
            "EYESITEM",
            "HEAD",
            "NECK",
            "LEFTWRIST",
            "RIGHTWRIST",
            "LEFTHAND",
            "RIGHTHAND",
          ];
          const typeMap: { [key: string]: string } = {
            상의: "TOP",
            하의: "BOTTOM",
            세트: "SET",
            신발: "SHOES",
          };

          const filteredItems = mockClothItems.filter((item) => {
            const themeMatch =
              activeTheme === "추천" || item.theme.includes(activeTheme);

            let typeMatch = false;
            if (activeSubTab === "전체") {
              typeMatch = true;
            } else if (activeSubTab === "악세서리") {
              // activeSubTab이 '악세서리'이면, item.type이 accessoryTypes 배열에 포함되는지 확인합니다.
              typeMatch = accessoryTypes.includes(item.type);
            } else {
              typeMatch = item.type === typeMap[activeSubTab];
            }

            return themeMatch && typeMatch;
          });

          return (
            <div className={s.gridItems}>
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() =>
                    onItemSelect(item.name, item.description, item.type)
                  }
                >
                  <div className={s.item}>
                    <img src={`${IMG_BASE_URL}${item.name}`} alt={item.name} />
                  </div>
                  <div className={s.itemPrice}>
                    <img src={stone} />
                    {item.price}
                  </div>
                </div>
              ))}
            </div>
          );
        }
        case "background": {
          const typeMap: { [key: string]: string } = {
            별: "STARBACKGROUND",
            우주정거장: "STATIONBACKGROUND",
          };

          const filteredItems = mockBackgroundItems.filter((item) => {
            const themeMatch =
              activeTheme === "추천" || item.theme.includes(activeTheme);
            const typeMatch =
              activeSubTab === "전체" || item.type === typeMap[activeSubTab];
            return themeMatch && typeMatch;
          });

          return (
            <div className={s.gridItems}>
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() =>
                    onItemSelect(item.name, item.description, item.type)
                  }
                >
                  <div className={s.item}>
                    <img src={`${IMG_BASE_URL}${item.name}`} alt={item.name} />
                  </div>
                  <div className={s.itemPrice}>
                    <img src={stone} />
                    {item.price}
                  </div>
                </div>
              ))}
            </div>
          );
        }
        default:
          return null;
      }
    }
  };

  return (
    <div
      className={s.sheetContainer}
      style={{ height: isCollapsed ? "2dvh" : "" }}
    >
      <div className={s.barContainer}>
        <div className={s.bar}></div>
      </div>
      {!isCollapsed && (
        <>
          <div style={{ flexShrink: 0 }}>
            <ThemeCategoryTabs
              onSearchToggle={handleSearchToggle}
              isSearching={isSearching}
              activeTheme={activeTheme}
              onThemeChange={setActiveTheme}
            />
            <SubCategoryTabs
              activeCategory={activeCategory}
              isSearching={isSearching}
              activeSubTab={activeSubTab}
              onSubTabChange={setActiveSubTab}
            />
          </div>
          <div className={s.content}>{renderContent()}</div>
        </>
      )}
    </div>
  );
};

export default MarketBottomSheet;
