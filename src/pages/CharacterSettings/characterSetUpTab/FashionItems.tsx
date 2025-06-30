import { useState, useMemo, useCallback, useEffect } from "react";
import { useCharacterStore } from "../../../store/useCharacterStore";
import { OutfitImages } from "../../../assets/ImageData/OutfitImage";
import { ItemImages } from "../../../assets/ImageData/ItemImage";
import {
  getCategoryFromFileName,
  getMainCategory,
  getPartName,
} from "../../../constants/characterTabs";
import s from "./characterSetUptab.module.scss";

interface FashionItemsProps {
  tabs: { id: string; name: string }[];
  increaseLoadCount: () => void;
}

// 의상과 아이템 이미지 데이터를 하나의 배열로 합칩니다.
const allFashionItems = [...OutfitImages, ...ItemImages];

const FashionItems = ({ tabs, increaseLoadCount }: FashionItemsProps) => {
  const { userInfo, updateUserInfo } = useCharacterStore();
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  // 현재 선택된 세부 탭에 따라 보여줄 아이템 목록을 결정합니다.
  const filteredItems = useMemo(() => {
    if (activeTab === "all") {
      return allFashionItems;
    }
    // '악세서리' 탭일 경우 ItemImages만 필터링합니다.
    if (activeTab === "fashion_acc") {
      return ItemImages;
    }
    // 그 외 탭들은 OutfitImages에서 필터링합니다.
    return OutfitImages.filter((item) =>
      getCategoryFromFileName(item.name).startsWith(activeTab)
    );
  }, [activeTab]);

  // 아이템 클릭 시 실행될 함수 (타입 에러 수정 완료)
  const handleItemClick = useCallback(
    (itemName: string) => {
      const mainCategory = getMainCategory(itemName); // 'outfit' 또는 'item'
      const partName = getPartName(itemName); // 'top', 'bottom', 'head' 등

      if (!mainCategory || !partName) return;

      // 'outfit' 카테고리일 경우
      if (mainCategory === "outfit") {
        const typedPartName = partName as keyof typeof userInfo.outfit;
        const isEquipped = userInfo.outfit[typedPartName] === itemName;
        const newValue = isEquipped ? "" : itemName;

        const newOutfit = { ...userInfo.outfit };

        if (typedPartName === "set" && newValue) {
          // 세트를 입을 때
          newOutfit.top = "";
          newOutfit.bottom = "";
          newOutfit.set = newValue;
        } else if (
          (typedPartName === "top" || typedPartName === "bottom") &&
          newValue
        ) {
          // 상의/하의를 입을 때
          newOutfit.set = "";
          newOutfit[typedPartName] = newValue;
        } else {
          // 그 외 (신발, 선택 해제 등)
          newOutfit[typedPartName] = newValue;
        }

        updateUserInfo({ outfit: newOutfit });

        // 'item' 카테고리일 경우
      } else if (mainCategory === "item") {
        const typedPartName = partName as keyof typeof userInfo.item;
        const isEquipped = userInfo.item[typedPartName] === itemName;
        const newValue = isEquipped ? "" : itemName;

        updateUserInfo({
          item: {
            ...userInfo.item,
            [typedPartName]: newValue,
          },
        });
      }
    },
    [userInfo, updateUserInfo]
  );

  useEffect(() => {
    increaseLoadCount();
  }, [increaseLoadCount]);

  return (
    <div className={s.tabContainer}>
      {/* 세부 탭 UI (전체, 상의, 하의...) */}
      <div className={s.tab}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? s.active : ""}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* 필터링된 아이템 목록 UI */}
      <div className={s.tabContent}>
        <div className={s.gridItems}>
          {filteredItems.map((item) => (
            <div
              key={item.name}
              className={`${s.item} ${
                Object.values(userInfo.outfit).includes(item.name) ||
                Object.values(userInfo.item).includes(item.name)
                  ? s.selected
                  : ""
              }`}
              onClick={() => handleItemClick(item.name)}
            >
              <img src={item.src} alt={item.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FashionItems;
