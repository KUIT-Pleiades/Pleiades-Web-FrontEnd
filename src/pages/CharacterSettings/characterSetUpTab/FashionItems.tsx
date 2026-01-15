import { useState, useMemo, useCallback, useEffect } from "react";
import { useCharacterStore } from "../../../store/useCharacterStore";
import { useWearableItems } from "../../../hooks/queries/useWearableItems";
import { WearableItem } from "../../../interfaces/Interfaces";
import {
  getCategoryFromFileName,
  getMainCategory,
  getPartName,
} from "../../../constants/characterTabs";
import s from "./characterSetUptab.module.scss";
import { IMG_BASE_URL, getThumbnailPath } from "../../../functions/getImage";
import { trackEvent } from "../../../utils/analytics";

interface FashionItemsProps {
  tabs: { id: string; name: string }[];
  increaseLoadCount: () => void;
  initialOutfit: {
    top: string;
    bottom: string;
    set: string;
    shoes: string;
  };
  onItemSelect?: (description: string) => void;
}

const FashionItems = ({ tabs, increaseLoadCount, initialOutfit, onItemSelect }: FashionItemsProps) => {
  const { userInfo, updateUserInfo } = useCharacterStore();
  const { data, isLoading, isError } = useWearableItems();
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const filteredItems = useMemo(() => {
    if (!data?.fashionItems) return [];
    if (activeTab === "all") return data.fashionItems;
    if (activeTab === "fashion_acc") {
      return data.fashionItems.filter((item) => item.name.startsWith("fashion_acc_"));
    }
    return data.fashionItems.filter((item) =>
      getCategoryFromFileName(item.name).startsWith(activeTab)
    );
  }, [activeTab, data?.fashionItems]);

  const handleItemClick = useCallback(
    (item: WearableItem) => {
      const itemName = item.name;
      const mainCategory = getMainCategory(itemName);
      const partName = getPartName(itemName);

      if (!mainCategory || !partName) return;
      
      const isEquipped = mainCategory === "outfit" 
        ? userInfo.outfit[partName as keyof typeof userInfo.outfit] === itemName
        : userInfo.item[partName as keyof typeof userInfo.item] === itemName;

      trackEvent("Character", "preview_item", { 
        item_id: itemName, 
        category: activeTab,
        action: isEquipped ? "deselect" : "select"
      });

      if (mainCategory === "outfit") {
        const typedPartName = partName as keyof typeof userInfo.outfit;
        const mandatoryParts = ["top", "bottom", "set", "shoes"];
        if (isEquipped && mandatoryParts.includes(typedPartName)) return;

        const newValue = isEquipped ? "" : itemName;
        onItemSelect?.(isEquipped ? "" : item.description);

        const newOutfit = { ...userInfo.outfit };
        if (typedPartName === "set" && newValue) {
          newOutfit.top = ""; newOutfit.bottom = ""; newOutfit.set = newValue;
        } else if (typedPartName === "top" && newValue) {
          newOutfit.set = ""; newOutfit.top = newValue;
          if (!newOutfit.bottom) newOutfit.bottom = initialOutfit.bottom;
        } else if (typedPartName === "bottom" && newValue) {
          newOutfit.set = ""; newOutfit.bottom = newValue;
          if (!newOutfit.top) newOutfit.top = initialOutfit.top;
        } else {
          newOutfit[typedPartName] = newValue;
        }
        updateUserInfo({ outfit: newOutfit });
      } else if (mainCategory === "item") {
        const typedPartName = partName as keyof typeof userInfo.item;
        const newValue = isEquipped ? "" : itemName;
        onItemSelect?.(isEquipped ? "" : item.description);
        updateUserInfo({ item: { ...userInfo.item, [typedPartName]: newValue } });
      }
    },
    [userInfo, updateUserInfo, initialOutfit, onItemSelect, activeTab]
  );

  useEffect(() => {
    if (!isLoading && data) increaseLoadCount();
  }, [isLoading, data, increaseLoadCount]);

  if (isLoading) return <div className={s.tabContainer}>아이템을 불러오는 중...</div>;
  if (isError) return <div className={s.tabContainer}>아이템을 불러오지 못했습니다.</div>;

  return (
    <div className={s.tabContainer}>
      <div className={s.tab}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? s.active : ""}
            onClick={() => {
              // [Insight] 의상 카테고리(상의, 하의 등) 이동을 추적합니다.
              trackEvent("Character", "click_sub_tab", { category: tab.id });
              setActiveTab(tab.id);
            }}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className={s.tabContent}>
        <div className={s.gridItems}>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`${s.item} ${
                Object.values(userInfo.outfit).includes(item.name) ||
                Object.values(userInfo.item).includes(item.name)
                  ? s.selected : ""
              }`}
              onClick={() => handleItemClick(item)}
            >
              <img src={`${IMG_BASE_URL}${getThumbnailPath(item.name)}`} alt={item.description} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FashionItems;