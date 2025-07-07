import { useState, useMemo, useCallback, useEffect } from "react";
import { useCharacterStore } from "../../../store/useCharacterStore";
import {
  FashionImages,
  type FashionItem,
} from "../../../assets/ImageData/FashionImage";
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

const FashionItems = ({ tabs, increaseLoadCount }: FashionItemsProps) => {
  const { userInfo, updateUserInfo } = useCharacterStore();
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  // --- [수정] 필터링 로직이 훨씬 간단해집니다. ---
  const filteredItems = useMemo(() => {
    if (activeTab === "all") {
      return FashionImages; // 항상 FashionImages 배열 하나만 사용
    }
    // 'fashion_acc' 탭이면 'fashion_acc_'로 시작하는 아이템만 필터링
    if (activeTab === "fashion_acc") {
      return FashionImages.filter((item) =>
        item.name.startsWith("fashion_acc_")
      );
    }
    // 그 외 탭들은 해당 id로 시작하는 아이템만 필터링
    return FashionImages.filter((item) =>
      getCategoryFromFileName(item.name).startsWith(activeTab)
    );
  }, [activeTab]);

  // handleItemClick 함수는 수정할 필요 없이 그대로 작동합니다.
  const handleItemClick = useCallback(
    (itemName: string) => {
      const mainCategory = getMainCategory(itemName);
      const partName = getPartName(itemName);

      if (!mainCategory || !partName) return;

      if (mainCategory === "outfit") {
        const typedPartName = partName as keyof typeof userInfo.outfit;
        const isEquipped = userInfo.outfit[typedPartName] === itemName;
        const newValue = isEquipped ? "" : itemName;
        const newOutfit = { ...userInfo.outfit };

        if (typedPartName === "set" && newValue) {
          newOutfit.top = "";
          newOutfit.bottom = "";
          newOutfit.set = newValue;
        } else if (
          (typedPartName === "top" || typedPartName === "bottom") &&
          newValue
        ) {
          newOutfit.set = "";
          newOutfit[typedPartName] = newValue;
        } else {
          newOutfit[typedPartName] = newValue;
        }
        updateUserInfo({ outfit: newOutfit });
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
