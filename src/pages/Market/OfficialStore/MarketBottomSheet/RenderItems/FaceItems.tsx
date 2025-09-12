import React from "react";
import { mockFaceItems } from "../MockData/mockFaceItem";
import ItemGrid from "./ItemGrid"; // 1단계에서 만든 ItemGrid 컴포넌트 import
//import { CategoryType } from "../../OfficialUsedStore";

// FaceItems 컴포넌트가 받을 props 타입을 정의합니다.
interface ItemProps {
  activeTheme: string;
  activeSubTab: string;
  likedItems: Set<number>;
  onItemSelect: (
    id: number,
    name: string,
    description: string,
    price: number,
    type: string
  ) => void;
}

const FaceItems: React.FC<ItemProps> = ({
  activeTheme,
  activeSubTab,
  likedItems,
  onItemSelect,
}) => {
  // 기존 MarketBottomSheet에 있던 'face' 카테고리 로직을 그대로 가져옵니다.
  const typeMap: { [key: string]: string } = {
    머리: "HAIR",
    눈: "EYES",
    코: "NOSE",
    입: "MOUTH",
    점: "MOLE",
  };

  const filteredItems = mockFaceItems.filter((item) => {
    if (activeTheme === "좋아요") {
      return likedItems.has(item.id);
    }
    const themeMatch =
      activeTheme === "추천" || item.theme.includes(activeTheme);
    const typeMatch =
      activeSubTab === "전체" || item.type === typeMap[activeSubTab];
    return themeMatch && typeMatch;
  });

  // 필터링된 데이터를 ItemGrid에 넘겨 렌더링합니다.
  return (
    <ItemGrid
      items={filteredItems}
      likedItems={likedItems}
      onItemSelect={onItemSelect}
    />
  );
};

export default FaceItems;
