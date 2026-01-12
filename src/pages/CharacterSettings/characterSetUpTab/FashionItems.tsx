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

const IMG_BASE_URL: string = import.meta.env.VITE_IMG_BASE_URL;

interface FashionItemsProps {
  tabs: { id: string; name: string }[];
  increaseLoadCount: () => void;
  initialOutfit: {
    top: string;
    bottom: string;
    set: string;
    shoes: string;
  };
}

const FashionItems = ({ tabs, increaseLoadCount, initialOutfit }: FashionItemsProps) => {
  const { userInfo, updateUserInfo } = useCharacterStore();
  const { data, isLoading, isError } = useWearableItems();
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  // --- [수정] 필터링 로직이 훨씬 간단해집니다. ---
  const filteredItems = useMemo(() => {
    if (!data?.fashionItems) return [];

    if (activeTab === "all") {
      return data.fashionItems;
    }
    // 'fashion_acc' 탭이면 'fashion_acc_'로 시작하는 아이템만 필터링
    if (activeTab === "fashion_acc") {
      return data.fashionItems.filter((item) =>
        item.name.startsWith("fashion_acc_")
      );
    }
    // 그 외 탭들은 해당 id로 시작하는 아이템만 필터링
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

      if (mainCategory === "outfit") {
        const typedPartName = partName as keyof typeof userInfo.outfit;
        const isEquipped = userInfo.outfit[typedPartName] === itemName;
        const newOutfit = { ...userInfo.outfit };

        const mandatoryParts = ["top", "bottom", "set", "shoes"];
        if (isEquipped && mandatoryParts.includes(typedPartName)) {
          return;
        }

        const newValue = isEquipped ? "" : itemName;

        // --- [수정] 세트 <-> 상/하의 전환 로직을 개선합니다. ---
        if (typedPartName === "set" && newValue) {
          // 1. 세트를 입을 때: 상의와 하의를 비웁니다.
          newOutfit.top = "";
          newOutfit.bottom = "";
          newOutfit.set = newValue;
        } else if (typedPartName === "top" && newValue) {
          // 2. 상의를 입을 때: 세트를 비우고, 하의가 비어있다면 초기 하의를 복구합니다.
          newOutfit.set = "";
          newOutfit.top = newValue;
          if (!newOutfit.bottom) {
            newOutfit.bottom = initialOutfit.bottom;
          }
        } else if (typedPartName === "bottom" && newValue) {
          // 3. 하의를 입을 때: 세트를 비우고, 상의가 비어있다면 초기 상의를 복구합니다.
          newOutfit.set = "";
          newOutfit.bottom = newValue;
          if (!newOutfit.top) {
            newOutfit.top = initialOutfit.top;
          }
        } else {
          // 4. 그 외 (신발 선택 등)
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
    [userInfo, updateUserInfo, initialOutfit]
  );

  // 데이터 로딩이 완료되면 이미지 로딩 카운트를 증가시킵니다.
  useEffect(() => {
    if (!isLoading && data) {
      increaseLoadCount();
    }
  }, [isLoading, data, increaseLoadCount]);

  if (isLoading) {
    return <div className={s.tabContainer}>아이템을 불러오는 중...</div>;
  }

  if (isError) {
    return <div className={s.tabContainer}>아이템을 불러오지 못했습니다.</div>;
  }

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
              key={item.id}
              className={`${s.item} ${
                Object.values(userInfo.outfit).includes(item.name) ||
                Object.values(userInfo.item).includes(item.name)
                  ? s.selected
                  : ""
              }`}
              onClick={() => handleItemClick(item)}
            >
              <img src={`${IMG_BASE_URL}${item.name}`} alt={item.description} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FashionItems;
