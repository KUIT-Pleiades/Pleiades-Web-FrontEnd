import React from "react";
import ItemGrid from "./ItemGrid";
import { useUsedFaceItems } from "../../../../../hooks/queries/useUsedFaceItems";

interface ItemProps {
  activeTheme: string;
  activeSubTab: string;
  onItemSelect: (
    id: number,
    name: string,
    description: string,
    price: number,
    type: string
  ) => void;
  likedItems: Set<number>; // 중고몰에서는 likedItems가 필요할 수 있습니다.
}

const UsedFaceItems: React.FC<ItemProps> = ({
  activeTheme,
  activeSubTab,
  onItemSelect,
  likedItems,
}) => {
  const { data, isLoading, isError, error } = useUsedFaceItems();

  if (isLoading) {
    return <div>중고몰 아이템을 불러오는 중입니다...</div>;
  }

  if (isError) {
    return <div>에러가 발생했습니다: {error.message}</div>;
  }

  if (!data || !data.items) {
    return <div>아이템 데이터를 받아오지 못했습니다.</div>;
  }

  const typeMap: { [key: string]: string } = {
    머리: "HAIR",
    눈: "EYES",
    코: "NOSE",
    입: "MOUTH",
    점: "MOLE",
  };

  const filteredItems = data.items.filter((item) => {
    if (activeTheme === "좋아요") {
      return likedItems.has(item.id);
    }
    const themeMatch =
      activeTheme === "추천" || item.theme.includes(activeTheme);
    const typeMatch =
      activeSubTab === "전체" || item.type === typeMap[activeSubTab];
    return themeMatch && typeMatch;
  });

  return (
    <ItemGrid
      items={filteredItems}
      likedItems={likedItems} // `ItemGrid`에 likedItems를 전달합니다.
      onItemSelect={onItemSelect}
    />
  );
};

export default UsedFaceItems;
