import React from "react";
import ItemGrid from "./ItemGrid";
import { useUsedClothItems } from "../../../../../hooks/queries/useUsedClothItems";

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
  likedItems: Set<number>;
}

const UsedClothItems: React.FC<ItemProps> = ({
  activeTheme,
  activeSubTab,
  onItemSelect,
  likedItems,
}) => {
  const { data, isLoading, isError, error } = useUsedClothItems();

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
    상의: "TOP",
    하의: "BOTTOM",
    세트: "SET",
    신발: "SHOES",
    // 악세서리 타입 추가
    머리: "HEAD",
    눈: "EYESITEM",
    귀: "EARS",
    목: "NECK",
    왼쪽손목: "LEFTWRIST",
    오른쪽손목: "RIGHTWRIST",
    왼손: "LEFTHAND",
    오른손: "RIGHTHAND",
  };

  const wishlist = new Set(data.wishlist);

  const filteredItems = data.items.filter((item) => {
    if (activeTheme === "좋아요") {
      return wishlist.has(item.id);
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
      likedItems={likedItems}
      onItemSelect={onItemSelect}
    />
  );
};

export default UsedClothItems;
