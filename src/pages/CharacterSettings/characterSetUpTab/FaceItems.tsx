import { useState, useEffect, useMemo, useCallback } from "react";
import { useCharacterStore } from "../../../store/useCharacterStore";
import { useWearableItems } from "../../../hooks/queries/useWearableItems";
import { WearableItem } from "../../../interfaces/Interfaces";
import {
  getCategoryFromFileName,
  getPartName,
} from "../../../constants/characterTabs";
import s from "./characterSetUptab.module.scss";
import { IMG_BASE_URL, getThumbnailPath } from "../../../functions/getImage";
import { trackEvent } from "../../../utils/analytics";

interface FaceItemsProps {
  tabs: { id: string; name: string }[];
  increaseLoadCount: () => void;
  onItemSelect?: (description: string) => void;
}

const FaceItems = ({ tabs, increaseLoadCount, onItemSelect }: FaceItemsProps) => {
  const { userInfo, updateUserInfo } = useCharacterStore();
  const { data, isLoading, isError } = useWearableItems();
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const filteredItems = useMemo(() => {
    if (!data?.faceItems) return [];
    if (activeTab === "all") {
      return data.faceItems;
    }
    return data.faceItems.filter((item) =>
      getCategoryFromFileName(item.name).startsWith(activeTab)
    );
  }, [activeTab, data?.faceItems]);

  const handleItemClick = useCallback(
    (item: WearableItem) => {
      const partName = getPartName(item.name);
      if (!partName) return;

      const optionalParts = ["mole"];
      const isDeselecting =
        userInfo.face[partName as keyof typeof userInfo.face] === item.name;

      trackEvent("Character", "preview_item", { 
        item_id: item.name, 
        category: activeTab,
        action: isDeselecting ? "deselect" : "select"
      });

      if (isDeselecting && !optionalParts.includes(partName)) {
        return;
      }

      onItemSelect?.(isDeselecting ? "" : item.description);

      updateUserInfo({
        face: {
          ...userInfo.face,
          [partName]: isDeselecting ? "" : item.name,
        },
      });
    },
    [userInfo, updateUserInfo, onItemSelect, activeTab] 
  );

  useEffect(() => {
    if (!isLoading && data) {
      increaseLoadCount();
    }
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
                Object.values(userInfo.face).includes(item.name) ? s.selected : ""
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

export default FaceItems;