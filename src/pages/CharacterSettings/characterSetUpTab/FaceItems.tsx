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

// CharacterSetUp.tsx로부터 props를 받기 위한 인터페이스
interface FaceItemsProps {
  tabs: { id: string; name: string }[];
  increaseLoadCount: () => void;
  onItemSelect?: (description: string) => void;
}

const FaceItems = ({ tabs, increaseLoadCount, onItemSelect }: FaceItemsProps) => {
  const { userInfo, updateUserInfo } = useCharacterStore();
  const { data, isLoading, isError } = useWearableItems();

  // '얼굴' 탭 내의 세부 탭(전체, 피부색, 머리...) 상태를 관리합니다.
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  // 현재 선택된 세부 탭에 따라 보여줄 아이템 목록을 결정합니다.
  const filteredItems = useMemo(() => {
    if (!data?.faceItems) return [];

    // '전체' 탭이면 모든 얼굴 관련 아이템을 반환합니다.
    if (activeTab === "all") {
      return data.faceItems;
    }
    // 그 외의 탭이면, 파일명의 카테고리와 현재 탭의 id가 일치하는 아이템만 필터링됩니다.
    // 예: activeTab이 'face_hair'이면, 'face_hair_01.png', 'face_hair_02.png' 등이 필터링됩니다.
    return data.faceItems.filter((item) =>
      getCategoryFromFileName(item.name).startsWith(activeTab)
    );
  }, [activeTab, data?.faceItems]);

  // 아이템을 클릭했을 때 Zustand 스토어의 상태를 업데이트하는 함수
  const handleItemClick = useCallback(
    (item: WearableItem) => {
      const partName = getPartName(item.name);
      if (!partName) return;

      // --- [추가] 선택 해제가 가능한 파츠 목록을 정의합니다. ---
      const optionalParts = ["mole"];

      // 현재 클릭한 아이템이 이미 선택된 아이템인지 확인
      const isDeselecting =
        userInfo.face[partName as keyof typeof userInfo.face] === item.name;

      // --- [수정] 선택 해제는 optionalParts 목록에 있는 파츠만 가능하도록 변경 ---
      if (isDeselecting && !optionalParts.includes(partName)) {
        // 이미 선택된 아이템을 다시 클릭했지만, 필수 파츠(피부, 머리 등)인 경우
        // 아무것도 하지 않고 함수를 종료합니다.
        return;
      }

      // 아이템 설명 표시
      onItemSelect?.(isDeselecting ? "" : item.description);

      updateUserInfo({
        face: {
          ...userInfo.face,
          // optionalParts는 선택 해제가 가능하고, 나머지는 항상 선택 상태를 유지합니다.
          [partName]: isDeselecting ? "" : item.name,
        },
      });
    },
    [userInfo, updateUserInfo, onItemSelect]
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
      {/* 세부 탭 UI (전체, 피부색, 머리...) */}
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
              key={item.id}
              className={`${s.item} ${
                // 현재 캐릭터가 착용하고 있는 아이템인지 확인하여 'selected' 클래스를 부여합니다.
                Object.values(userInfo.face).includes(item.name)
                  ? s.selected
                  : ""
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
