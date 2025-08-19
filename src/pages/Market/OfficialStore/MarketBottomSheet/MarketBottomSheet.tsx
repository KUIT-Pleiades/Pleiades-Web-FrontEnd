import React, { useState } from "react";
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
  onItemSelect: (name: string, descripsion: string, type: string) => void;
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
                    onItemSelect(item.name, item.descripsion, item.type)
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
          const typeMap: { [key: string]: string } = {
            상의: "TOP",
            하의: "BOTTOM",
            세트: "SET",
            신발: "SHOES",
            악세서리: "MOLE",
          };

          const filteredItems = mockClothItems.filter((item) => {
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
                    onItemSelect(item.name, item.descripsion, item.type)
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
                    onItemSelect(item.name, item.descripsion, item.type)
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
