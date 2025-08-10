import React, { useState } from 'react';
import s from "./MarketBottomSheet.module.scss";
import { CategoryType } from '.././OfficialUsedStore'; 
import ThemeCategoryTabs from './ThemeCategoryTabs';
import SubCategoryTabs from './SubCategoryTabs';
import { mockFaceItems } from './MockData/mockFaceItem';
import stone from "../../../../assets/market/stone.svg";

const IMG_BASE_URL: string = import.meta.env.VITE_PINATA_ENDPOINT;

interface MarketBottomSheetProps {
  activeTab: string;
  activeCategory: CategoryType;
  isCollapsed: boolean;
}

const MarketBottomSheet: React.FC<MarketBottomSheetProps> = ({ activeTab, activeCategory, isCollapsed }) => {
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchToggle = () => {
    setIsSearching(!isSearching);
  };

  const renderContent = () => {
    if (activeTab === 'official') {
      switch (activeCategory) {
        case 'face':
          return <div>공식몰 - 얼굴 아이템 목록</div>;
        case 'cloth':
          return <div>공식몰 - 의상 아이템 목록</div>;
        case 'background':
          return <div>공식몰 - 배경 아이템 목록</div>;
        default:
          return null;
      }
    } else if (activeTab === 'used') {
      switch (activeCategory) {
        case 'face':
          return (
            <div className={s.gridContainer}>
              {mockFaceItems.map((item) => (
                <div key={item.id} className={s.item}>
                  <img
                    src={`${IMG_BASE_URL}${item.name}`}
                    alt={item.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                  />
									<div>{item.price}<img src={stone}/></div>
                </div>
              ))}
            </div>
          );
        case 'cloth':
          return <div>중고몰 - 의상 아이템 목록</div>;
        case 'background':
          return <div>중고몰 - 배경 아이템 목록</div>;
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
      <div className={s.barContainer}><div className={s.bar}></div></div>
      {!isCollapsed && (
        <>
          <ThemeCategoryTabs onSearchToggle={handleSearchToggle} isSearching={isSearching} />
          <SubCategoryTabs activeCategory={activeCategory} isSearching={isSearching} />
          <div className={s.content}>{renderContent()}</div>
        </>
      )}
    </div>
  );
};

export default MarketBottomSheet;